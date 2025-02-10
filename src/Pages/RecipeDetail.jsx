import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../Components/Loader";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(0);

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
      if (res.status === 200) {
        setRecipe(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRecipe();
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { comment: newComment, rating: rating }]);
      setNewComment("");
    }
  };

  return recipe ? (
    <div className="bg-gray-50 rounded-lg shadow-lg p-8 w-[90%] mx-auto mt-6">
      <h1 className="text-4xl font-bold mb-4 text-indigo-800">
        {recipe.title}
      </h1>

      <div className="flex justify-between items-center text-lg mb-4">
        <div className="flex items-center">
          <span className="text-red-500 font-semibold mr-2">Rating:</span>
          <span className="text-gray-700 font-bold">
            {recipe.rating.toFixed(1)}
          </span>
          <span className="text-yellow-500 ml-2">★</span>
        </div>
        <div>
          <span className="text-red-500 font-semibold">Preparation Time:</span>
          <span className="text-gray-700"> {recipe.prep_time} min</span>
        </div>
      </div>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-[400px] object-cover rounded-lg shadow-md mb-6"
      />

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-indigo-800">
          Ingredients
        </h2>
        <div
          className="text-lg text-gray-700"
          dangerouslySetInnerHTML={{ __html: recipe.ingredients }}
        ></div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3 text-indigo-800">
          Instructions
        </h2>
        <div
          className="text-lg text-gray-700"
          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
        ></div>
      </div>

      {/* Rating System */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-3 text-indigo-800">
          Rate this Recipe
        </h2>
        <div className="flex">
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <span
                key={index}
                className={`cursor-pointer text-3xl ${
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
      </div>

      {/* Comment Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-3 text-indigo-800">
          Comments
        </h2>
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-3 border outline-none border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
            placeholder="Add a comment..."
            rows="4"
          />
          <button
            type="submit"
            className="mt-3 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
          >
            Submit Comment
          </button>
        </form>

        <div>
          {comments.length === 0 ? (
            <p className="text-gray-500 text-lg font-semibold italic">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <ul className="space-y-4 w-[100%] mx-auto">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col bg-gradient-to-r from-green-900 via-green-800 to-gray-700 text-white px-6 py-4 rounded-lg shadow-lg"
                >
                  <p className="text-lg font-medium">{comment.comment}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-300">
                      User {index + 1}
                    </span>
                    <span className="text-yellow-400 font-semibold flex items-center">
                      ★ {comment.rating}
                    </span>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default RecipeDetail;
