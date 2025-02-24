import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

function RecipeAIBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const botRef = useRef(null);

  // Disable scrolling when modal is open
  useEffect(() => {
    if (showRecipeModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showRecipeModal]);

  // Close bot when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (botRef.current && !botRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Generate a recipe (Simulating API call with delay)
  const generateRecipe = async () => {
    if (ingredients.trim() === "") return;
    setIsThinking(true);

    try {
      const res = await axios.get(
        `https://recipeshare-server.onrender.com/api/generateRecipe?ingredients=${ingredients}`
      );
      if (res.status === 200) {
        setIsThinking(false);
        setRecipe(res.data.data.content);
        setShowRecipeModal(true);
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
    }

    setIngredients("");
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-50">
      {/* Button to Open AI Bot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        {isOpen ? "Close AI Bot 🤖" : "Open AI Bot 🤖"}
      </button>

      {/* AI Bot Popup */}
      {isOpen && (
        <div
          ref={botRef}
          className="fixed bottom-16 right-4 md:bottom-20 md:right-6 lg:bottom-24 lg:right-8 w-80 max-w-full bg-white p-4 shadow-lg rounded-lg border border-gray-300"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Recipe AI Bot</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-red-500 font-bold text-xl"
            >
              ×
            </button>
          </div>

          <p className="text-gray-600 mt-2">
            Enter ingredients to generate a recipe:
          </p>

          {/* Input field */}
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., tomatoes, cheese, basil"
            className="w-full p-2 border outline-none border-gray-300 rounded mt-2"
          />

          {/* Generate Recipe Button */}
          <button
            onClick={generateRecipe}
            className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Generate Recipe
          </button>

          {/* Thinking Indicator */}
          {isThinking && (
            <p className="mt-2 text-blue-500 font-semibold">Thinking... 🤖</p>
          )}
        </div>
      )}

      {/* Recipe Modal */}
      {showRecipeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 md:p-6 lg:p-8">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">
                Generated Recipe
              </h3>
              <button
                onClick={() => setShowRecipeModal(false)}
                className="text-red-500 font-bold text-xl"
              >
                ×
              </button>
            </div>
            <p className="mt-4 overflow-y-auto w-full h-[300px] text-gray-800">
              <ReactMarkdown>{recipe}</ReactMarkdown>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeAIBot;
