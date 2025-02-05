import React, { useContext, useEffect, useState } from "react";
import RecipeCard from "../Components/RecipeCard";
import { Loader } from "../Components/Loader";
import { ToastContainer } from "react-toastify";
import { dataContext } from "../Context/AppContext";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const { data } = useContext(dataContext);

  useEffect(() => {
    if (data?.All_recipes) {
      setRecipes(data.All_recipes);
    }
  }, [data]);

  // Filter recipes based on search input
  const filteredRecipes = recipes.filter(
    (recipe) => recipe?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div className="bg-gray-100 min-h-screen p-6 w-full mt-4">
      <ToastContainer />

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Our Recipes
      </h1>

      {/* Search Box */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a recipe..."
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Recipes Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : searchQuery ? (
        <p className="text-center text-gray-600 mt-10 text-lg">
          No recipes found for "<span className="font-semibold">{searchQuery}</span>"
        </p>
      ) : (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default RecipeList;
