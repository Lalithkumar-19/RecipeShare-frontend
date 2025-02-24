import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
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
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

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
        "https://recipeshare-server.onrender.com/api/recipes",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": localStorage.getItem("token"),
            "userId": localStorage.getItem("userId"),
          },
        }
      );
      if (res.status == 201) {
        const { cnt } = res.data;
        localStorage.setItem("recipes_created", cnt);
        toast.success("Successfully created the recipe!");
      } else {
        toast.info("Unable to reach servers.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred!");
    }
    setCreatingState(false);
  };

  return (
    <div ref={formRef} className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-xl">
      <ToastContainer />
      <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-6 animate-pulse">
        Create a New Recipe
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Recipe Title</label>
          <input
            className="w-full border-none outline-none rounded-lg py-3 px-4 focus:ring focus:ring-indigo-400"
            type="text"
            placeholder="Enter recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Ingredients</label>
          <textarea
            className="w-full border-none outline-none  rounded-lg py-3 px-4 focus:ring focus:ring-indigo-400"
            placeholder="Enter ingredients (one per line)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Instructions</label>
          <textarea
            className="w-full border-none outline-none  rounded-lg py-3 px-4 focus:ring focus:ring-indigo-400"
            placeholder="Enter cooking instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows="5"
            required
          ></textarea>
        </div>

        <div className="mb-6 overflow-x-hidden">
          <label className="block text-lg font-semibold mb-2">Upload Image</label>
          <FileUploader handleChange={handleChange} name="file" className="w-[80%]" types={fileTypes} />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Preparation Time (in minutes)</label>
          <input
            className="w-full border-none outline-none  rounded-lg py-3 px-4 focus:ring focus:ring-indigo-400"
            type="number"
            placeholder="Enter preparation time"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            min={0}
            required
          />
        </div>

        <button
          className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 text-center flex place-content-center"
          type="submit"
          disabled={creatingState}
        >
          {creatingState ? <Loader /> : "Create Recipe"}
        </button>
      </form>
    </div>
  );
}

export default CreateRecipe;
