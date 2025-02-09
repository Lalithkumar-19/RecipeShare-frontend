"use client"; // Required for Next.js (if using App Router)
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ExploreCards({ img, title, info, direction = "bottom" }) {
  const cardRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);

  // Scroll Animation (Entry from Top/Bottom)
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: direction === "bottom" ? 100 : -100, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
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

  // Hover Effect (Expanding Overlay + Text Animations)
  const handleMouseEnter = () => {
    gsap.to(bgRef.current, { width: "100%", duration: 0.6, ease: "power2.out" });
    gsap.to(textRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" });
    gsap.to(titleRef.current, { y: -5, duration: 0.4, ease: "power1.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(bgRef.current, { width: "0%", duration: 0.6, ease: "power2.out" });
    gsap.to(textRef.current, { opacity: 0.5, duration: 0.6, ease: "power2.out" });
    gsap.to(titleRef.current, { y: 0, duration: 0.4, ease: "power1.out" });
  };

  return (
    <div
      ref={cardRef}
      className="relative bg-[#121212] shadow-xl w-[400px] p-5 overflow-hidden cursor-pointer hover:scale-105 transition duration-300 rounded-lg border border-gray-800"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Overlay */}
      <div
        ref={bgRef}
        className="absolute top-0 left-0 h-full bg-green-700 opacity-60"
        style={{ width: "0%", zIndex: 1, transition: "width 0.5s ease-in-out" }}
      ></div>

      {/* Image */}
      <img
        src={img}
        alt="explore"
        className="w-full h-[250px] object-cover rounded-lg relative z-10"
      />

      {/* Text Section */}
      <div className="relative z-10 p-4 mt-4 text-center">
        <h1
          ref={titleRef}
          className="text-xl font-bold text-white transition-all duration-300"
        >
          {title}
        </h1>
        <p
          ref={textRef}
          className="text-gray-300 mt-2 opacity-50 transition-all duration-300"
        >
          {info}
        </p>
      </div>
    </div>
  );
}

export default ExploreCards;
