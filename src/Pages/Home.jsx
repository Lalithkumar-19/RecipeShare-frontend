import React from 'react';
import { Link } from 'react-router-dom';
import RecipeList from './RecipeList';

function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto p-4">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to <span className="text-green-500">RecipeShare</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover, create, and share delicious recipes with food lovers around the world!
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-6 mb-8">
          <Link
            to="/recipes"
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300"
          >
            Explore Recipes
          </Link>
          <Link
            to="/create"
            className="bg-gradient-to-l from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300"
          >
            Create Recipe
          </Link>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="w-full max-w-6xl min-w-[80%]">
        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80"
          alt="Delicious food"
          className="rounded-lg shadow-lg w-full object-cover h-[500px]"
        />
      </div>
      <RecipeList/>

      {/* Footer Section */}
      <footer className="mt-12 text-gray-500 text-sm">
        &copy; 2024 RecipeShare. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
