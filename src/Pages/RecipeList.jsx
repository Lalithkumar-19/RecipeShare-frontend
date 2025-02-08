import React, { useContext, useEffect, useState } from "react";
import RecipeCard from "../Components/RecipeCard";
import { Loader } from "../Components/Loader";
import { ToastContainer } from "react-toastify";
import { DataContext } from "../Context/AppContext";
import axios from "axios";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [totalSearchRecipes, setTotalSearchRecipes] = useState(0);
  const { data, setPage } = useContext(DataContext);
  const { totalrecipesCnt, All_recipes } = data;

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setRecipes(All_recipes);
    }
  }, [All_recipes, searchQuery]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        fetchFilteredRecipes(1, true);
      } else {
        setRecipes(All_recipes);
        setSearchPage(1);
      }
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const fetchFilteredRecipes = async (page = 1) => {
    try {
      if (searchQuery.trim() !== "") {
        const res = await axios.get(
          `http://localhost:5000/api/getFiltered?query=${searchQuery.trim()}&page=${page}&limit=10`
        );
        if (res.status === 200) {
          const { recipes, totalRecipes } = res.data;
          if (page === 1) {
            setRecipes(recipes);
          } else {
            setRecipes((prev) => [...prev, ...recipes]);
          }
          setTotalSearchRecipes(totalRecipes);
        }
      }
    } catch (error) {
      console.error("Error fetching filtered recipes:", error);
    }
  };

  const handleLoadMore = () => {
    if (searchQuery.trim() !== "") {
      if (recipes.length < totalSearchRecipes) {
        const nextPage = searchPage + 1;
        setSearchPage(nextPage);
        fetchFilteredRecipes(nextPage);
      }
    } else {
      if (All_recipes.length < totalrecipesCnt) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

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
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <RecipeCard key={`${recipe.id}-${index}`} recipe={recipe} />
          ))}
        </div>
      ) : searchQuery ? (
        <p className="text-center text-gray-600 mt-10 text-lg">
          No recipes found for "
          <span className="font-semibold">{searchQuery}</span>"
        </p>
      ) : (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}

      {/* Load More Button */}
      {(searchQuery.trim() !== ""
        ? recipes.length < totalSearchRecipes
        : All_recipes.length < totalrecipesCnt) && (
        <div className="w-full flex place-content-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-green-800 p-3 text-white rounded-lg hover:bg-green-700 transition duration-200"
            type="button"
          >
            Load More...
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeList;
