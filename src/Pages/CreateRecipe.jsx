import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../Components/Loader";


function CreateRecipe() {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [file, setFile] = useState(null);
  const [creatingState, setCreatingState] = useState(false);

  const handleChange = (file) => {
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (prepTime < 0) {
      toast("Preparation time cannot be negative.");
      return;
    }
    const ingredientsHTML = `<ul>${ingredients
      .split("\n")
      .map((line) => `<li>${line.trim()}</li>`)
      .join("")}</ul>`;
    const instructionsHTML = instructions
      .split("\n")
      .map((line) => `<p>${line.trim()}</p>`)
      .join("");

    setCreatingState(true);
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("ingredients", ingredientsHTML);
    formdata.append("instructions", instructionsHTML);
    formdata.append("prep_time", prepTime);
    formdata.append("rating", 4.3);
    formdata.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/recipes",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
          },
        }
      );
      if (res.status == 201) {
        const {cnt}=res.data;
        localStorage.setItem("recipes_created", cnt); 
        toast.success("Yahoo..sucessfully Recipe Created");
      } else {
        toast.info("Cant reach our servers");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error has been occured!");
    }
    setCreatingState(false);
    // setTitle("");
    // setIngredients("");
    // setInstructions("");
    // setImage("");
    // setPrepTime(0);
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer />
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
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-400 focus:outline-none scrollbar-hide"
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
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-400 focus:outline-none scrollbar-hide"
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
            min={0}
            required
          />
        </div>
        <motion.button
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="submit"
          disabled={creatingState}
          whileHover={!creatingState ? { scale: 1.05 } : {}}
          whileTap={!creatingState ? { scale: 0.95 } : {}}
          onClick={handleSubmit}
        >
          {creatingState ? (
            <div className="w-100 flex flex-1 place-content-center">
              <Loader />
            </div>
          ) : (
            "Create Recipe"
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default CreateRecipe;
