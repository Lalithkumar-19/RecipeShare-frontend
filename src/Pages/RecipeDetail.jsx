import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../Components/Loader";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  // Example recipe data, you can replace this with a dynamic fetch based on `id`
  const fetchRecipe = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
      if (res.status == 200) {
        setRecipe(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRecipe();
  }, []);

  // State to hold comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Handle new comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };
  if (recipe) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 w-[90%] mx-auto mt-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {recipe.title}
        </h1>

        <div className="md:1-full h-10 flex flex-row place-content-between">
          <div className="flex items-center mb-4">
            <span className="text-red-600 first-letter:font-bold first-letter:font-mono">
              Rating:
            </span>
            <span className="text-gray-600">{recipe.rating.toFixed(1)}</span>
            <span className="text-yellow-500 mr-1">★</span>
          </div>
          {/* preparation time */}
          <div>
            <span className="text-red-600 first-letter:font-bold first-letter:font-mono">
              Preparation Time:
            </span>
            <span>{recipe.prep_time}min</span>
          </div>
        </div>

        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Ingredients
          </h2>
          <div className="text-lg leading-10" dangerouslySetInnerHTML={{ __html: recipe.ingredients}}></div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Instructions
          </h2>
          <div className="text-lg leading-10" dangerouslySetInnerHTML={{ __html:recipe.instructions }}></div>
        </div>

        {/* Comment Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Comments
          </h2>
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Add a comment..."
              rows="4"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Submit Comment
            </button>
          </form>

          {/* Display comments */}
          <div>
            {comments.length === 0 ? (
              <p className="text-gray-500">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              <ul className="space-y-2">
                {comments.map((comment, index) => (
                  <li key={index} className="bg-gray-100 p-2 rounded-md">
                    {comment}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default RecipeDetail;
