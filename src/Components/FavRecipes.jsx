// import react from "react"
// function FavRecipes() {
//     return (
//         <div className="bg-white flex-col-reverse text-black md:flex md:flex-row w-full flex place-content-around p-0 md:p-3">
//             <div className="p-5 flex flex-col md:w-[50%] md:flex-row md:justify-items-center">
//                 <div className="md:w-[500px] w-full">
//                     <h1 className="md:pb-1 pb-0 md:p-1 p-0 text-base font-medium ">Discover</h1>
//                     <h2 className="text-4xl p-0 md:p-1   bree-serif-regular leading-tight">Find Your
//                         Favourite Recipes with Ease</h2>
//                     <p className="md: text-justify md:pt-3 roboto w-full ">
//                         Searching for the perfect recipe has never been easier.Use our
//                         intuitive search bar to explore a world of culinary delights.</p>
//                     <div className="flex space-x-6 py-10">

//                         <div className="items-center ">
//                             <i className="fa-solid fa-magnifying-glass text-black-500 text-2xl py-3"></i>
//                             <h3 className="text-2xl roboto-with-weight py-3">Search Recipes</h3>
//                             <p className="text-sm roboto py-1 mr-1 justify-evenly">Enter ingredients,cuisine types or recipe names to find delicious options.</p>
//                         </div>
//                         <div className="items-center ">
//                             <i className="fa-solid fa-cube text-black-500 text-2xl py-3 ml-3"></i>
//                             <h3 className="text-2xl roboto-with-weight py-3 ml-3">Get Cooking</h3>
//                             <p className="text-sm roboto py-1 ml-3 justify-evenly text-black">Start your culinary adventure today with our easy-to-use seach tool.</p>
//                         </div>
//                     </div>
//                     <div className="space-x-6 py-4">
//                         <button className="px-5 py-2 border-2 border-black bg-white-100 text-black hover:scale-105">Search</button>
//                         <button className="px-5 py-2 bg-white text-black hover:text-lg">Explore <i class="fa-sharp fa-thin fa-greater-than text-sm"></i></button>

//                     </div>
//                 </div>
//             </div>
//             <div className="md:w-[50%] w-full flexobject-fill p-5 md:h-[550px] h-[380px] ">
//                 <img  src="https://images.pexels.com/photos/9266190/pexels-photo-9266190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="w-full h-full rounded-md" alt="favrecipe" />
//             </div>

//         </div>

//     )
// }
// export default FavRecipes;

"use client"; // Required for Next.js App Router
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function FavRecipes() {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRefs = useRef([]);

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
            <h3 className="text-xl font-semibold text-gray-900 mt-2">Search Recipes</h3>
            <p className="text-gray-700 text-md mt-1">
              Enter ingredients, cuisine types, or recipe names to find delicious options.
            </p>
          </div>
          <div className="flex flex-col items-start">
            <i className="fa-solid fa-utensils text-green-500 text-3xl"></i>
            <h3 className="text-xl font-semibold text-gray-900 mt-2">Get Cooking</h3>
            <p className="text-gray-700 text-md mt-1">
              Start your culinary adventure today with our easy-to-use search tool.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-6 py-4">
          <button
            ref={(el) => (buttonRefs.current[0] = el)}
            className="px-5 py-2 border-2 border-black bg-white text-black rounded-md font-semibold hover:bg-green-500 hover:text-white transition-all duration-300"
          >
            Search
          </button>
          <button
            ref={(el) => (buttonRefs.current[1] = el)}
            className="px-5 py-2 bg-black text-white rounded-md font-semibold hover:bg-green-700 transition-all duration-300 flex items-center gap-2"
          >
            Explore <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* Right Side Image */}
      <div ref={imageRef} className="md:w-[50%] w-full p-5 md:h-[550px] h-[380px]">
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
