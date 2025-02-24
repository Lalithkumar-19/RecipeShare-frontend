import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const DataContext = createContext();

export const AppContext = ({ children }) => {

  const [page, setPage] = useState(1);
   const [fav_Recipes, setFav_Recipes] = useState([]);
    const [Created_Recipes, setCreated_Recipes] = useState(null);
  const [data, setData] = useState({
    favRecipes: [],
    list_recipes: [],
    All_recipes: [],
    totalrecipesCnt: 0,
    favcnt: 0,
    createdRecipes_cnt:0,
    currentPage: page,
  });
  

  const LoadFavRecipes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/getFavRecipeslist?userId=${localStorage.getItem(
          "userId"
        )}`
      );
          console.log("res",res);
      if (res.status === 200) {
        const { data, cnt } = res.data;
        setData((prev) => ({ ...prev, favRecipes: data, favcnt: cnt }));
        localStorage.setItem("fav_recipes_cnt", cnt);
      } else {
        console.log("error occured while fetching fav");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/recipes?limit=5&page=${page}`
      );

      if (res.status === 200) {
        setData((prev) => {
          const newRecipes = res.data.data;

          // Create a Set of existing recipe IDs for quick lookup
          const existingIds = new Set(prev.All_recipes.map((r) => r.id));

          // Filter out duplicates
          const uniqueNewRecipes = newRecipes.filter(
            (recipe) => !existingIds.has(recipe.id)
          );

          return {
            ...prev,
            All_recipes: [...prev.All_recipes, ...uniqueNewRecipes],
            totalrecipesCnt: res.data.cnt,
          };
        });
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    LoadFavRecipes();
  }, []);
  useEffect(() => {
    fetchRecipes();
  }, [page]);


  console.log("context",data);
  return (
    <DataContext.Provider value={{ data, setData, page, setPage ,fav_Recipes,setFav_Recipes,Created_Recipes,setCreated_Recipes,fetchRecipes}}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext };
