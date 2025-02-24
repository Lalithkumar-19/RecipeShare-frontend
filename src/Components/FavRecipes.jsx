import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function FavRecipes() {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRefs = useRef([]);
  const navigate=useNavigate();

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    buttonRefs.current.forEach((btn, index) => {
      gsap.fromTo(
        btn,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "bounce.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: btn,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="bg-white flex-col-reverse text-black md:flex md:flex-row w-full flex place-content-around p-5 md:p-8">
      {/* Left Side Text */}
      <div ref={textRef} className="p-5 flex flex-col md:w-[50%]">
        <h1 className="text-lg font-semibold text-gray-600">Discover</h1>
        <h2 className="text-5xl font-bold text-gray-900 leading-tight mt-2">
          Find Your Favorite Recipes with Ease
        </h2>
        <p className="text-lg text-gray-700 mt-4">
          Searching for the perfect recipe has never been easier. Use our
          intuitive search bar to explore a world of culinary delights.
        </p>

        {/* Features Section */}
        <div className="flex space-x-6 py-10">
          <div className="flex flex-col items-start">
            <i className="fa-solid fa-magnifying-glass text-green-500 text-3xl"></i>
            <h3 className="text-xl font-semibold text-gray-900 mt-2">
              Search Recipes
            </h3>
            <p className="text-gray-700 text-md mt-1">
              Enter ingredients, cuisine types, or recipe names to find
              delicious options.
            </p>
          </div>
          <div className="flex flex-col items-start">
            <i className="fa-solid fa-utensils text-green-500 text-3xl"></i>
            <h3 className="text-xl font-semibold text-gray-900 mt-2">
              Get Cooking
            </h3>
            <p className="text-gray-700 text-md mt-1">
              Start your culinary adventure today with our easy-to-use search
              tool.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-6 py-4">
          <button
            ref={(el) => (buttonRefs.current[0] = el)}
            className="px-5 py-2 border-2 border-black bg-white text-black rounded-md font-semibold hover:bg-green-500 hover:text-white transition-all duration-300" onClick={()=>{navigate("/recipes")}}
          >
            Search
          </button>
          <button
            ref={(el) => (buttonRefs.current[1] = el)}
            className="px-5 py-2 bg-black text-white rounded-md font-semibold hover:bg-green-700 transition-all duration-300 flex items-center gap-2"
            onClick={()=>{navigate("/recipes")}}
          >
            Explore <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* Right Side Image */}
      <div
        ref={imageRef}
        className="md:w-[50%] w-full p-5 md:h-[550px] h-[380px]"
      >
        <img
          src="https://images.pexels.com/photos/9266190/pexels-photo-9266190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-full h-full rounded-md shadow-lg"
          alt="favrecipe"
        />
      </div>
    </div>
  );
}

export default FavRecipes;
