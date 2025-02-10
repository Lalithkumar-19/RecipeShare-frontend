import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { DataContext } from "../Context/AppContext";

const RecipeCard = ({ recipe }) => {
  const context = useContext(DataContext);
  const { data, setData, fav_Recipes, setFav_Recipes } = context;
  const [isFavourite, setIsFavourite] = useState(false); // Default false

  // Check if recipe is in user's favorite list when component mounts
  useEffect(() => {
    const isFav = data.favRecipes.some(
      (item) => parseInt(item) == parseInt(recipe.id)
    );
    setIsFavourite(isFav);
  }, []);

  const handleUnsave = async () => {
    if (!isFavourite) return;
    if (!localStorage.getItem("token")) {
      toast.info("Login to save and unsave Recipes");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/removeFromSaved?id=${
          recipe.id
        }&userId=${localStorage.getItem("userId")}`
      );

      if (res.status === 200) {
        const { cnt, data } = res.data;
        setFav_Recipes((prev) => prev.filter((item) => item.id != recipe.id));
        setData((prev) => ({ ...prev, favRecipes: data, favcnt: cnt }));
        localStorage.setItem("fav_recipes_cnt", cnt);
        toast.success("Recipe removed from favorites!");
        setIsFavourite(false);
      } else {
        toast.error("Failed to remove from favorites.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove from favorites.");
    }
  };

  const handleSave = async () => {
    if (isFavourite) {
      handleUnsave(); // If already favorite, unsave instead
      return;
    }

    if (!localStorage.getItem("token")) {
      toast.info("Login to save Recipes");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/saveRecipe?id=${
          recipe.id
        }&userId=${localStorage.getItem("userId")}`
      );

      if (res.status === 200) {
        const { cnt, data } = res.data;
        setData((prev) => ({ ...prev, favRecipes: data, favcnt: cnt }));
        localStorage.setItem("fav_recipes_cnt", cnt);
        toast.success("Recipe added to favorites!");
        setIsFavourite(true);
      } else {
        toast.error("Failed to save recipe.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save recipe.");
    }
  };

  return (
    <div className="md:hover:scale-105 p-4 relative">
      {/* Favorite Icon */}
      <div
        className={`fa fa-bookmark absolute top-2 right-5 text-[27px] z-50 cursor-pointer ${
          isFavourite ? "text-red-800" : "text-gray-500"
        }`}
        onClick={handleSave}
      ></div>

      {/* Recipe Card */}
      <Link
        key={recipe.id}
        to={`/recipe/${recipe.id}`}
        className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-xl"
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-[200px] object-cover"
        />
        <div className="mt-2">
          <h2 className="text-xl line-clamp-1 font-semibold mb-2 text-gray-800">
            {recipe.title}
          </h2>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="text-yellow-500 text-lg mr-2">★</span>
              <span className="text-gray-600 font-medium">
                Rating: {recipe.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              Preparation Time: {recipe.prep_time}min
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
