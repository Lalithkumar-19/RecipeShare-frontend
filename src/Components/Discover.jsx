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
      { opacity: 0, scale: 0.9 },
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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
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
    <div
      ref={containerRef}
      className="bg-white mx-4 md:mx-8 py-10 px-6 text-center rounded-lg shadow-md"
    >
      <h1 className="text-black text-3xl md:text-4xl font-bold px-2 md:px-6 mb-4">
        Discover Delicious Recipes Today!
      </h1>
      <p className="text-black text-lg md:text-xl px-2">
        Join our community to explore, share, and enjoy a world of culinary delights.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <button
          ref={(el) => (btnRefs.current[0] = el)}
          className="py-2 px-5 font-medium bg-black text-white rounded-md w-full sm:w-[140px] text-center hover:bg-green-500 transition duration-300"
        >
          Explore
        </button>
        <button
          ref={(el) => (btnRefs.current[1] = el)}
          className="py-2 px-5 font-medium bg-transparent text-black rounded-md w-full sm:w-[140px] text-center hover:bg-green-500 transition duration-300 border-2 border-black"
        >
          Share
        </button>
      </div>
    </div>
  );
}

export default Discover;
