import React from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const user = {
    name: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    dp:
      localStorage.getItem("dp") &&
      localStorage.getItem("dp") !== "null" &&
      localStorage.getItem("dp") !== "undefined" &&
      localStorage.getItem("dp").trim() !== ""
        ? localStorage.getItem("dp")
        : "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png",
    recipesCreated: 15,
    favoriteRecipes: 30,
  };
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("dp");
    localStorage.removeItem("token");
    navigate("/");
    location.reload();
  };
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">User Profile</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex items-center mb-6">
          <img
            src={user.dp}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg p-4 text-white">
            <h3 className="text-lg font-semibold mb-2">Recipes Created</h3>
            <p className="text-3xl font-bold">{user.recipesCreated}</p>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-4 text-white">
            <h3 className="text-lg font-semibold mb-2">Favorite Recipes</h3>
            <p className="text-3xl font-bold">{user.favoriteRecipes}</p>
          </div>
        </div>
        <div className="flex flex-row w-full place-content-between h-[40px]">
          <button className="bg-gradient-to-r  from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 mr-10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
