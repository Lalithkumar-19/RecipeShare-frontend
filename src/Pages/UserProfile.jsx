import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import RecipeCard from "../Components/RecipeCard";
import ReactPaginate from "react-paginate";
import { DataContext } from "../Context/AppContext";
import UserRecipeCard from "../Components/UserRecipesCard";
import { toast, ToastContainer } from "react-toastify";

function UserProfile() {
  const navigate = useNavigate();
  const [EditMode, setEditMode] = useState(false);
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [togglelist, setTogglelist] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [favRecipePage, setfavRecipePage] = useState(0);
  const [currentFavPage, setCurrentFavPage] = useState(0);
  const [dp, setdp] = useState(null);
  const [name, setupdatedname] = useState("");

  const context = useContext(DataContext);
  const {
    data,
    setData,
    fav_Recipes,
    setFav_Recipes,
    Created_Recipes,
    setCreated_Recipes,
  } = context;

  useEffect(() => {
    try {
      let rounded_val = Math.ceil(data.createdRecipes_cnt / 4);
      let rounded_fav_cnt = Math.ceil(data.favcnt / 4);
      setfavRecipePage(rounded_fav_cnt);
      setPageCount(rounded_val);
    } catch (err) {
      console.log(err);
    }
  }, [data.favcnt]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleFavPageClick = (event) => {
    setCurrentFavPage(event.selected);
  };

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
    recipesCreated:
      Created_Recipes != null
        ? Array.isArray(Created_Recipes) && Created_Recipes.length
        : localStorage.getItem("recipes_created"),
    favoriteRecipes: data.favcnt || 0,
  };

  const LoadRecipesCreated = async (page) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/getpostedRecipes?page=${page + 1
        }&limit=${4}`,
        {
          headers: {
            userId: localStorage.getItem("userId"),
          },
        }
      );
      if (res.status == 200) {
        setData((prev) => ({ ...prev, createdRecipes_cnt: res.data.cnt }));
        setCreated_Recipes([...res.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const LoadFavRecipes = async (page) => {
    try {
      if (!localStorage.getItem("userId")) return;

      const res = await axios.get(`http://localhost:5000/api/getFavRecipes`, {
        params: {
          page: page + 1,
          limit: 4,
          userId: localStorage.getItem("userId"),
        },
      });
      if (res.status == 200) {
        setFav_Recipes([...res.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LoadRecipesCreated(currentPage);
  }, [currentPage]);

  useEffect(() => {
    LoadFavRecipes(currentFavPage);
  }, [currentFavPage]);

  //api request to get list of fav and created recipes;

  const [Updatedetails, setUpdatedetails] = useState({
    name: user.name,
  });


  const handleChange = (file) => {
    setdp(file);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("dp");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
    location.reload();
  };

  const updateDp = async () => {
    if (dp === null) return;
    try {
      const data = new FormData();
      data.append("image", dp);

      const res = await axios.post("http://localhost:5000/api/updateUserdp", data, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        }
      });
      if (res.status === 200) {
        localStorage.setItem("dp", res.data);
        toast.success("Successfully updated dp");
        location.reload();
      }
    }
    catch (err) {
      toast.error("Failed to updated user dp");
    }
  }

  const updateName = async () => {
    if (name === "") return;
    try {

      const res = await axios.post("http://localhost:5000/api/updateUserName", { name }, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        }
      });
      if (res.status === 200) {
        localStorage.setItem("username",res.data);
        toast.success("Successfully updated username");
        location.reload();
      } else {
        toast.error("Failed to updated user name");
        setEditMode(false);
      }
    }
    catch (err) {
      toast.error("Failed to updated user name");

    }
  }

  const updateUserDetails = async () => {
    updateDp();
    updateName();
    setTimeout(() => {
      setEditMode(false);
    }, 2000);
  };


  return (
    <div className="max-w-2xl mx-auto place-items-center">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8 text-gray-800">User Profile</h1>
      <div className="bg-white w-[100%] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div
          className={`flex   flex-1 mb-6 ${EditMode && "flex-col place-content-center gap-3 "
            }`}
        >
          <img
            src={user.dp}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-4 place-self-center"
          />
          {EditMode && (
            <>
              <FileUploader
                handleChange={handleChange}
                name="file"
                className="w-[100%]"
                types={fileTypes}
              />
            </>
          )}
          <div className="flex flex-1 flex-col gap-2">
            {!EditMode && (
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.name}
              </h2>
            )}
            {EditMode && (
              <>
                <label className="text-xl font-semibold text-gray-800 mb-1">
                  Update Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setupdatedname(e.target.value)
                  }
                  className="w-full border outline-none bg-slate-100  rounded-md p-1 px-2"
                />
              </>
            )}

            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            onClick={() => setTogglelist(false)}
            className="cursor-pointer bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg p-4 text-white"
          >
            <h3 className="text-lg font-semibold mb-2">Recipes Created</h3>
            <p className="text-3xl font-bold">{user.recipesCreated}</p>
          </div>
          <div
            onClick={() => setTogglelist(true)}
            className=" cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-4 text-white"
          >
            <h3 className="text-lg font-semibold mb-2">Favorite Recipes</h3>
            <p className="text-3xl font-bold">{user.favoriteRecipes}</p>
          </div>
        </div>
        <div className="flex flex-row w-full place-content-between h-[40px]">
          {!EditMode && (
            <button
              onClick={() => {
                setEditMode(true);
              }}
              className="bg-gradient-to-r  from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 mr-10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            >
              Edit Profile
            </button>
          )}
          {EditMode && (
            <button
              onClick={updateUserDetails}
              className="bg-gradient-to-r  from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 mr-10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            >
              Save Profile
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log Out
          </button>
        </div>
      </div>

      {togglelist && (
        <div className="flex  flex-col w-full mb-12">
          <h2 className="text-2xl p-2 font-semibold text-gray-800 underline underline-offset-4 mb-4">
            Favourite Recipes
          </h2>
          <div className="grid grid-cols-2 w-full">
            {fav_Recipes &&
              Array.isArray(fav_Recipes) &&
              fav_Recipes.map((recipe) => {
                return <RecipeCard key={recipe.id} recipe={recipe} />;
              })}
            {data.favcnt == 0 && (
              <h1 className="p-2">No Recipes Created By You</h1>
            )}
          </div>


          <div
            className={`mx-auto  w-full ${data.favcnt != 0 ? "flex" : "hidden"
              } place-items-center `}
          >
            <ReactPaginate
              className="flex  mx-auto gap-4"
              previousLabel={"←Prev"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              pageCount={favRecipePage}
              onPageChange={handleFavPageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      )}

      {!togglelist && (
        <div className="flex  flex-col w-full mb-12 ">
          <h2 className="text-2xl p-2 font-semibold text-gray-800 underline underline-offset-4 mb-4">
            Recipes By You
          </h2>
          {Created_Recipes != null &&
            Array.isArray(Created_Recipes) && Created_Recipes.length === 0 && "None of you have saved yet...."}
          <div className="grid sm:p-2 md:p-0 sm:grid-cols-2  gap-4 w-full">
            {Created_Recipes != null &&
              Array.isArray(Created_Recipes) &&
              Created_Recipes.length !== 0 &&
              Created_Recipes.map((recipe) => {
                return <UserRecipeCard key={recipe.id} recipe={recipe} />;
              })}
          </div>
          <div
            className={`mx-auto  w-full ${Created_Recipes != null &&
              Array.isArray(Created_Recipes) && Created_Recipes.length !== 0 ? "flex" : "hidden"
              } place-items-center `}
          >
            <ReactPaginate
              className="flex  mx-auto gap-4"
              previousLabel={"←Prev"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
