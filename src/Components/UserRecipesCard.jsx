import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { DataContext } from "../Context/AppContext";

const UserRecipeCard = ({ recipe }) => {
  
  const context = useContext(DataContext);
  const { Created_Recipes, setCreated_Recipes, data, setData } = context;

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/deleteRecipe?id=${recipe.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (res.status == 200) {
        toast.success("Recipe deleted successfully");
        const newlist = Array.isArray(Created_Recipes)
          ? Created_Recipes.filter((item) => item.id != recipe.id)
          : [];
        setCreated_Recipes([...newlist]);
        setData((prev) => ({ ...prev, createdRecipes_cnt: res.data.cnt }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="md:hover:scale-105 p-4 relative">
      {/* Favorite Icon */}
      <div
        onClick={handleDelete}
        className={`fa fa-trash absolute top-2 right-5 text-[27px] z-50 cursor-pointer -800 text-red-500`}
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

export default UserRecipeCard;
