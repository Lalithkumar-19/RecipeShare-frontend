import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const DataContext = createContext();

export const AppContext = ({ children }) => {
  
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    favRecipes: [],
    list_recipes: [],
    All_recipes: [],
    totalrecipesCnt: 0,
    currentPage: page,
  });

  console.log("context is", data);

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
          const uniqueNewRecipes = newRecipes.filter((recipe) => !existingIds.has(recipe.id));
  
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
    fetchRecipes();
  }, [page]);

  return (
    <DataContext.Provider value={{ data, setData, page, setPage }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext };