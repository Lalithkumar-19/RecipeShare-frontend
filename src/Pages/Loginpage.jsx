import React, { useContext, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { DataContext } from "../Context/AppContext";


function LoginPage() {
  const { data, setData } = useContext(DataContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignuping, setIsSignuping] = useState(false);
  const navigate = useNavigate();
  const GoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Email validation
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };


  
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 3) {
      setNameError("Please enter name with atleast length of three");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      !emailError &&
      !passwordError &&
      !nameError &&
      name &&
      password &&
      name
    ) {
      setIsSignuping(true);
      try {
        const res = await axios.post("https://recipeshare-server.onrender.com/api/signup", {
          email,
          password,
          name,
        });
        if (res.status == 201) {
          toast.success("You successfully signed in...");
          setIsSignuping(false);
          setName("");
          setEmail("");
          setPassword("");
          setToggle(false);
        } else {
          alert("error");
          setIsSignuping(false);
          setName("");
          setEmail("");
          setPassword("");
        }
      } catch (error) {
        toast.error("User Email may be used");
        console.log(error);
      }
      setIsSignuping(false);
    } else {
      toast.info("crednetial needed to sign in are not provided");
    }
  };

  //normal login function
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailError && !passwordError && email && password) {
      setIsSubmitting(true);
      try {
        const res = await axios.post("https://recipeshare-server.onrender.com/api/login", {
          email,
          password,
        });
        if (res.status == 200) {
          const { token, user } = res.data;
          setData((prev) => ({
            ...prev,
            favRecipes: user.fav_recipes,
            list_recipes: user.list_recipes,
          }));
          localStorage.setItem("userId", user.id);
          localStorage.setItem("fav_recipes_cnt", user.fav_recipes_cnt);
          setData((prev)=>({...prev,favcnt:user.fav_recipes_cnt}));
          localStorage.setItem("recipes_created", user.recipes_created);
          localStorage.setItem("token", token);
          localStorage.setItem("username", user.name);
          localStorage.setItem("email", user.email);
          localStorage.setItem("dp", user.profile_pic);
          navigate("/");
          location.reload();
        }
      } catch (error) {
        toast.error("User may not registered...");
      }
      setIsSubmitting(false);
    }
  };

  //google login handlers

  const handleGoogleLoginSuccess = async (response) => {
    const { credential } = response;
    try {
      const res = await axios.post("https://recipeshare-server.onrender.com/api/google-login", {
        token: credential,
      });
      if (res.status == 200 || res.status == 201) {
        const { token, user } = res.data;
        console.log(user, "user data");
        setData((prev) => ({
          ...prev,
          favRecipes: user.fav_recipes,
          list_recipes: user.list_recipes,
        }));
        localStorage.setItem("userId", user.id);
        localStorage.setItem("fav_recipes_cnt", user.fav_recipes_cnt);
        localStorage.setItem("recipes_created", user.recipes_created);
        localStorage.setItem("token", token);
        localStorage.setItem("username", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("dp", user.profile_pic);
        navigate("/");
        location.reload();
      }
    } catch (error) {
      alert("error occured while logging through google");
    }
  };

  const handleGoogleLoginFailure = (error) => {
    alert("error occured while logging through google");
    console.log("Google Login Error", error);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <ToastContainer/>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {toggle ? "Sign Up" : "Login"}
        </h2>

        <form onSubmit={handleLogin}>
          {toggle && (
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                placeholder="Enter your Name"
                value={name}
                onChange={handleNameChange}
                required
              />
              {nameError && (
                <p className="text-red-500 text-sm mt-1">{nameError}</p>
              )}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
             <Link
               to={"/forgot-password"}
              className="text-blue-500 hover:text-blue-600"
              onClick={() => setToggle(!toggle)}
            >
              Forgot Password?
            </Link>
          </div>
          {!toggle ? (
            <button
              type="submit"
              className={`w-full p-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSignUp}
              className={`w-full p-3 mt-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition ${
                isSignuping ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSignuping}
            >
              {isSignuping ? "Signuping in..." : "SignUp"}
            </button>
          )}
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-700">Or login with</span>
        </div>

        {/* Google Login */}
        <GoogleOAuthProvider clientId={GoogleClientId}>
          <div className="mt-4">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              useOneTap
              theme="filled_blue"
            />
          </div>
        </GoogleOAuthProvider>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            {toggle ? "Already have an account?  " : "Don't have an account?"}
            <button
              type="button"
              className="text-blue-500 hover:text-blue-600"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? "Login" : "Sign Up"}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
