import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileUploader } from "react-drag-drop-files";

function CreateRecipe() {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [prepTime, setPrepTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (prepTime < 0) {
      alert("Preparation time cannot be negative.");
      return;
    }

    console.log({
      title,
      ingredients,
      instructions,
      image,
      prep_time: prepTime,
    });

    setTitle("");
    setIngredients("");
    setInstructions("");
    setImage("");
    setPrepTime("");
  };

  const [file, setFile] = useState(null);
  console.log(file);
  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Create New Recipe
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8"
      >
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="title"
          >
            Recipe Title
          </label>
          <motion.input
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
            id="title"
            type="text"
            placeholder="Enter recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="ingredients"
          >
            Ingredients
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
            id="ingredients"
            placeholder="Enter ingredients (one per line)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="5"
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="instructions"
          >
            Instructions
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
            id="instructions"
            placeholder="Enter cooking instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows="8"
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="image"
          >
            Upload Image
          </label>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
             
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="prepTime"
          >
            Preparation Time (in minutes)
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
            id="prepTime"
            type="number"
            placeholder="Enter preparation time"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            min="0"
            required
          />
        </div>
        <motion.button
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Recipe
        </motion.button>
      </form>
    </motion.div>
  );
}

export default CreateRecipe;
