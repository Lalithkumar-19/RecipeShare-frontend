import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const dataContext = createContext();

export const AppContext = ({ children }) => {
  const [data, setData] = useState({
    favRecipes: [],
    list_recipes: [],
    All_recipes: [],
  });
  console.log("context is",data);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/recipes");
      if (res.status === 200) {
        setData((prev) => ({ ...prev, All_recipes: res.data }));
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <dataContext.Provider value={{ data, setData }}>
      {children}
    </dataContext.Provider>
  );
};
