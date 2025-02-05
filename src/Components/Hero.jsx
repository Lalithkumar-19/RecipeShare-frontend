import React from "react";

function Hero() {
  return (
    <div className="relative w-full h-[550px] md:h-[600px] mb-3">
      {/* Background Video */}
      <video
        muted
        loop
        autoPlay

        title="Welcome"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100 -z-10"
      >
        <source
          src="https://videos.pexels.com/video-files/3209700/3209700-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient Overlay (Left Side) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10"></div>

      {/* Hero Text */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-16 max-w-xl text-white z-20">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Discover Your Next Favorite Recipe Today!
        </h1>
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Explore a curated collection of trending and popular recipes. Find inspiration for every meal and occasion, all in one place.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap space-x-4">
          <button className="py-2 px-6 bg-green-600 hover:bg-green-500 text-white font-medium rounded-md transition duration-300 shadow-lg">
            Explore
          </button>
          <button className="py-2 px-6 border border-green-500 hover:bg-green-600 hover:text-white text-green-500 font-medium rounded-md transition duration-300 shadow-lg">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
