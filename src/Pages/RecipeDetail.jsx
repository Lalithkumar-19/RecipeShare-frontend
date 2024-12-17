import React, { useState } from "react";
import { useParams } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();

  // Example recipe data, you can replace this with a dynamic fetch based on `id`
  const recipe = {
    title: "Spaghetti Carbonara",
    rating: 4.5,
    ingredients: [
      "Spaghetti",
      "Eggs",
      "Pancetta",
      "Parmesan cheese",
      "Black pepper",
    ],
    instructions: [
      "Cook spaghetti according to package instructions.",
      "In a bowl, whisk eggs and grated Parmesan cheese.",
      "Cook pancetta in a pan until crispy.",
      "Toss cooked spaghetti with pancetta and egg mixture.",
      "Season with black pepper and serve immediately.",
    ],
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  };

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

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-[90%] mx-auto mt-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{recipe.title}</h1>

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
          <span>20min</span>
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
        <ul className="list-disc list-inside text-gray-700">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Instructions
        </h2>
        <ol className="list-decimal list-inside text-gray-700">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="mb-2">
              {instruction}
            </li>
          ))}
        </ol>
      </div>

      {/* Comment Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Comments</h2>
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
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
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
}

export default RecipeDetail;
