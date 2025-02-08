"use client"; // Required for Next.js (if using App Router)
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ExploreCards({ img, title, info, direction = "bottom" }) {
  const cardRef = useRef(null);
  const bgRef = useRef(null);

  // Scroll Animation (Entry from Top/Bottom)
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: direction === "bottom" ? 100 : -100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [direction]);

  // Hover Effect (Semi-transparent Background Expands)
  const handleMouseEnter = () => {
    gsap.to(bgRef.current, {
      width: "100%",
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(bgRef.current, {
      width: "0%",
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative bg-white shadow-lg w-[400px] p-5 overflow-hidden cursor-pointer hover:scale-105 transition duration-300 rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Overlay (Covers Entire Card but Semi-Transparent) */}
      <div
        ref={bgRef}
        className="absolute top-0 left-0 h-full bg-green-700 opacity-50"
        style={{ width: "0%", zIndex: 1 }}
      ></div>

      {/* Image (Remains Visible) */}
      <img
        src={img}
        alt="explore"
        className="w-full h-[250px] object-cover rounded-lg relative z-10"
      />

      {/* Text Section */}
      <div className="relative z-10 p-4 mt-4">
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        <p className="text-gray-100 mt-2">{info}</p>
      </div>
    </div>
  );
}

export default ExploreCards;
