import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-transparent text-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-white text-lg">
                  RecipeShare
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/recipes"
                className="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300"
            >
                Recipes
              </Link>
              {localStorage.getItem("token") && (
                <Link
                  to="/create"
                  className="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300"
                >
                  Create Recipe
                </Link>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {localStorage.getItem("token") ? (
              <Link
                to="/profile"
                className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="py-2 px-2 font-medium bg-white text-black rounded-md w-[100px] text-center hover:bg-green-500 hover:text-white transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
        
      </div>
    </nav>
  );
}

export default Navigation;
