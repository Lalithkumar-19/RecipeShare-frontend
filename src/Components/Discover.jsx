"use client"; // Required for Next.js App Router
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Discover() {
  const containerRef = useRef(null);
  const btnRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    btnRefs.current.forEach((btn, index) => {
      gsap.fromTo(
        btn,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
    <div ref={containerRef} className="bg-white m-8 p-5 text-center">
      <h1 className="text-black text-4xl font-bold px-3 m-4">
        Discover Delicious Recipes Today!
      </h1>
      <p className="text-black text-xl">
        Join our community to explore, share, and enjoy a world of culinary delights.
      </p>

      <div className="flex justify-center gap-4 mt-4">
        <button
          ref={(el) => (btnRefs.current[0] = el)}
          className="py-2 px-4 font-medium bg-black text-white rounded-md w-[120px] text-center hover:bg-green-500 hover:text-white transition duration-300"
        >
          Explore
        </button>
        <button
          ref={(el) => (btnRefs.current[1] = el)}
          className="py-2 px-4 font-medium bg-transparent text-black rounded-md w-[120px] text-center hover:bg-green-500 hover:text-white transition duration-300 border-2 border-black"
        >
          Share
        </button>
      </div>
    </div>
  );
}

export default Discover;
