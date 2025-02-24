import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

function CommentsSection({ recipeId }) {
  const [comments, setComments] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(3);
  const [hover, setHover] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (recipeId) {
      loadComments(currentPage);
    }
  }, [recipeId, currentPage]);

  const loadComments = async (page) => {
    try {
      const res = await axios.get("https://recipeshare-server.onrender.com/api/comments", {
        params: { recipe_id: recipeId, page: page + 1 },
      });
      if (res.status === 200) {
        setComments(res.data.data);
        setPageCount(res.data.totalPages);
        setTotalComments(res.data.total);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!token) {
      alert("You must be logged in to post a comment.");
      return;
    }
    try {
      const res = await axios.post(
        "https://recipeshare-server.onrender.com/api/comments",
        {
          recipe_id: recipeId,
          content: newComment,
          rating,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (res.status === 201) {
        setComments([res.data.newComment, ...comments]);
        setTotalComments(res.data.total);
        setPageCount(Math.ceil(res.data.total / 10));
      }
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

 const handleDeleteComment = async (commentId) => {
  try {
    const res = await axios.delete(`https://recipeshare-server.onrender.com/api/comments/${commentId}`, {
      headers: {
        "x-auth-token": token,
      },
    });
    if (res.status === 200) {
      const updatedComments = comments.filter(comment => comment.id !== commentId);
      setComments(updatedComments);
      setTotalComments(totalComments - 1);

      // If the page is empty after deletion and it's not the first page, load the previous page
      if (updatedComments.length === 0 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else {
        loadComments(currentPage);
      }
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};

  console.log("comments",comments);

  return (
    <div className="comments-section mt-4">
      <h2 className="text-xl font-semibold">Comments ({totalComments})</h2>

      {/* Comment Input Section */}
      {token ? (
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            className="w-full h-10 rounded p-2 outline-none border-none"
            placeholder="Write a comment..."
            value={newComment}
            maxLength={50}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <div className="flex items-center mt-2">
            <span className="mr-2">Rating:</span>
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <span
                  key={index}
                  className={`cursor-pointer text-xl ${
                    currentRating <= (hover || rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </span>
              );
            })}
          </div>
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Comment
          </button>
        </form>
      ) : (
        <p className="text-red-500">You must be logged in to post a comment.</p>
      )}

      {/* Comments Display */}
      {comments.length > 0 ? (
        <>
          <div className="mt-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="comment p-3 border rounded-md mb-2"
              >
                <div className="flex items-center place-content-between mb-2">
                  <div className="flex place-items-center">
                    <img
                      src={comment.author_dp || "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"}
                      alt="dp"
                      className="w-10 h-10 rounded-full mr-1"
                    />
                    <span className="font-bold uppercase">{comment.author_name}</span>
                  </div>
                  <div className="flex place-items-center place-content-center gap-3 ">
                  <span className="text-sm text-gray-500">Rating: {comment.rating}</span>
                  {comment.author == userId && (
                  <button
                    className="text-red-500 fa-solid fa-trash"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    
                  </button>
                )}
                </div>
                </div>
                <p className="text-gray-700 line-clamp-2 ">{comment.content}</p>
                
              </div>
            ))}
          </div>

          {/* Pagination */}
          <ReactPaginate
            className="flex justify-center gap-4 mt-4"
            previousLabel={"← Prev"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </>
      ) : (
        <p className="mt-2">No comments yet.</p>
      )}
    </div>
  );
}

export default CommentsSection;
