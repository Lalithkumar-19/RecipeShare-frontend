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
      const res = await axios.get(`https://recipeshare-server.onrender.com/api/recipes/${id}`);
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



  return recipe ? (
    <div className="bg-gray-50 rounded-lg shadow-lg p-8 w-[90%] mx-auto mt-6">
      <h1 className="text-4xl font-bold mb-4 text-indigo-800">
        {recipe.title}
      </h1>

      <div className="flex justify-between items-center text-lg mb-4">
        <div className="flex items-center">
          <span className="text-red-500 font-semibold mr-2">Rating:</span>
          <span className="text-gray-700 font-bold">
            {recipe.rating}
          </span>
          <span className="text-yellow-500 ml-2">★</span>
        </div>
        <div>
          <span className="text-red-500 font-semibold">Preparation Time:</span>
          <span className="text-gray-700"> {recipe.prep_time} min</span>
        </div>
      </div>
      <div>
        <span className="text-red-500 font-semibold">Created By:</span>
        <img src={recipe.author_dp||"https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"}  className=" rounded-full  h-9 w-9 fa-solid  fa-user" alt="dp"/>
          <span className="text-gray-700 uppercase  font-serif "> 
            {recipe.author_name}</span>
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
       <CommentsSection recipeId={id}/>
    </div>
  ) : (
    <Loader />
  );
}

export default RecipeDetail;
