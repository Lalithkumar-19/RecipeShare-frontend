import React, { useContext, useEffect, useState } from "react";
import RecipeCard from "../Components/RecipeCard";
import { Loader } from "../Components/Loader";
import { ToastContainer } from "react-toastify";
import { dataContext } from "../Context/AppContext";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const { data } = useContext(dataContext);

  useEffect(() => {
    if (data?.All_recipes) {
      setRecipes(data.All_recipes);
    }
  }, [data]);
  

  return (
    <div className="bg-gray-100 min-h-screen p-6 w-full mt-4">
      {/* Search Recipes Input Box */}
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Our Recipes
      </h1>
      {recipes && Array.isArray(recipes)&&recipes.length>0? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="flex  flex-row w-full place-content-center">
        <Loader />
        </div>
      )}
    </div>
  );
}

export default RecipeList;
