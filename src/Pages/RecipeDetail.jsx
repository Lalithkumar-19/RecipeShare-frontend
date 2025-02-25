import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../Components/Loader";
import CommentsSection from "../Components/CommentSection";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(
        `https://recipeshare-server.onrender.com/api/recipes/${id}`
      );
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        {recipe ? (
          <div className="bg-gray-50 rounded-lg shadow-lg p-6 sm:p-8 max-w-4xl mx-auto mt-6">
            {/* Title Section */}
            <h1
              className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-4 overflow-hidden text-ellipsis line-clamp-2"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2, // Limits the title to 2 lines
                overflow: "hidden",
              }}
            >
              {recipe.title}
            </h1>

            {/* Rating & Time */}
            <div className="flex flex-wrap justify-between items-center text-lg mb-4">
              <div className="flex items-center">
                <span className="text-red-500 font-semibold mr-2">Rating:</span>
                <span className="text-gray-700 font-bold">{recipe.rating}</span>
                <span className="text-yellow-500 ml-2">★</span>
              </div>
              <div>
                <span className="text-red-500 font-semibold">
                  Preparation Time:
                </span>
                <span className="text-gray-700"> {recipe.prep_time} min</span>
              </div>
            </div>

            {/* Author Section */}
            <div className="flex items-center gap-2 mb-4">
              <img
                src={
                  recipe.author_dp ||
                  "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"
                }
                className="rounded-full h-10 w-10 border border-gray-300"
                alt="Author"
              />
              <span className="text-gray-700 uppercase font-serif font-medium">
                {recipe.author_name}
              </span>
            </div>

            {/* Recipe Image */}
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-[250px] sm:h-[350px] object-cover rounded-lg shadow-md mb-6"
            />

            {/* Ingredients Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3 text-indigo-800">
                Ingredients
              </h2>
              <div
                className="text-lg text-gray-700"
                dangerouslySetInnerHTML={{ __html: recipe.ingredients }}
              ></div>
            </div>

            {/* Instructions Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-indigo-800">
                Instructions
              </h2>
              <div
                className="text-lg text-gray-700"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              ></div>
            </div>

            {/* Comments Section */}
            <CommentsSection recipeId={id} />
          </div>
        ) : (
          <Loader />
        )}
      </div>

      {/* Sticky Footer */}
      <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
        © {new Date().getFullYear()} RecipeShare. All Rights Reserved.
      </footer>
    </div>
  );
}

export default RecipeDetail;
