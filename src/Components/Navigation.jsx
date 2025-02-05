import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Utility to close the mobile menu when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div>
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <span className="font-bold text-xl">RecipeShare</span>
            </Link>
          </div>

          {/* Hamburger Button (Mobile Only) */}
          <div className="md:hidden">
            <button
              onClick={handleToggle}
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.3 5.71a1 1 0 00-1.42-1.42L12 9.17 7.12 4.29a1 1 0 10-1.42 1.42L10.59 12l-4.88 4.88a1 1 0 101.42 1.42L12 14.83l4.88 4.88a1 1 0 001.42-1.42L13.41 12l4.89-4.88z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16v2H4zm0 6h16v2H4zm0 6h16v2H4z"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              onClick={closeMenu}
              className="py-2 px-3 hover:bg-gray-700 rounded transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/recipes"
              onClick={closeMenu}
              className="py-2 px-3 hover:bg-gray-700 rounded transition duration-300"
            >
              Recipes
            </Link>
            {localStorage.getItem("token") && (
              <Link
                to="/create"
                onClick={closeMenu}
                className="py-2 px-3 hover:bg-gray-700 rounded transition duration-300"
              >
                Create Recipe
              </Link>
            )}
            {localStorage.getItem("token") ? (
              <Link
                to="/profile"
                onClick={closeMenu}
                className="py-2 px-3 hover:bg-gray-700 rounded transition duration-300"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="py-2 px-3 bg-white text-black rounded-md hover:bg-green-500 hover:text-white transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            onClick={closeMenu}
            className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/recipes"
            onClick={closeMenu}
            className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-300"
          >
            Recipes
          </Link>
          {localStorage.getItem("token") && (
            <Link
              to="/create"
              onClick={closeMenu}
              className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-300"
            >
              Create Recipe
            </Link>
          )}
          {localStorage.getItem("token") ? (
            <Link
              to="/profile"
              onClick={closeMenu}
              className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-300"
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="block py-2 px-4 bg-white text-black rounded-md text-center hover:bg-green-500 hover:text-white transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navigation;
