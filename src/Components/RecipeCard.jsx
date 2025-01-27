import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { dataContext } from "../Context/AppContext";


const RecipeCard = ({ recipe }) => {
  const { data, setData } = useContext(dataContext);
  const [isFavourite, setIsFavourite] = useState(true);

  useEffect(() => {
    const isFav = data.favRecipes.find((item) => item === recipe.id);
    if (isFav) setIsFavourite(true);
  }, [data, recipe.id]);


  const handleUnsave = async () => {
    if (!isFavourite) return;
    if (!localStorage.getItem("userId")) {
      toast.info("Login to save ans Unsave Recipes");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:5000/api/removeFromSaved?id=${
          recipe.id
        }&userId=${localStorage.getItem("userId")}`
      );
      if (res.status == 200) {
        const { cnt, data } = res.data;
        setData((prev) => ({ ...prev, favRecipes: [...data] }));
        localStorage.setItem("fav_recipes_cnt", cnt);
        toast.success("Saved Sucessfully");
        setIsFavourite(false);
      } else {
        toast.error("Failed to UnSave");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to UnSave");
    }
  };


  const handleSave = async () => {
    if (isFavourite) {
      handleUnsave();
      return;
    }
    console.log("saving called");
    if (!localStorage.getItem("userId")) {
      toast.info("Login to save Recipes");
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:5000/api/saveRecipe?id=${
          recipe.id
        }&userId=${localStorage.getItem("userId")}`
      );
      if (res.status == 200) {
        const { cnt ,data} = res.data;
        localStorage.setItem("fav_recipes_cnt", cnt);
        setData((prev) => ({ ...prev, favRecipes: [...data] }));
        toast.success("Saved Sucessfully");
        setIsFavourite(true);
      } else {
        toast.error("Failed to Save");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Save");
    }
  };

  return (
    <div className="md:hover:scale-105 p-4 relative">
      <div
        className={`fa fa-bookmark absolute top-2 z-50 right-5 text-[27px] cursor-pointer ${
          isFavourite ? "text-red-800" : "text-black"
        }`}
        onClick={handleSave}
      ></div>
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
              Preparation Time: {recipe.prep_time}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
