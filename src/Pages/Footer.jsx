import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 ">RecipeShare</h3>
          <p className="text-gray-400">
            Explore, create, and share delicious recipes with our vibrant community of food enthusiasts.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-400 hover:text-green-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/recipes" className="text-gray-400 hover:text-green-400 transition">
                Recipes
              </Link>
            </li>
            <li>
              <Link to="/create" className="text-gray-400 hover:text-green-400 transition">
                Create Recipe
              </Link>
            </li>
            <li>
              <Link to="/profile" className="text-gray-400 hover:text-green-400 transition">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-2">
            <li className="text-gray-400">Email: contact@recipeshare.com</li>
            <li className="text-gray-400">Phone: +123 456 7890</li>
            <li className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-900 text-center py-4">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} RecipeShare. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
