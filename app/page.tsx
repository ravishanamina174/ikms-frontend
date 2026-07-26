"use client";
import React, { useState, useRef } from "react";
import ChatUI from "@/components/Chat/ChatUI";
import { motion } from "framer-motion";

export default function Home() {
  // State and ref for the interactive dotted background
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // 1. Tell TypeScript this ref will hold an HTMLElement
  const sectionRef = useRef<HTMLElement>(null); 

  // 2. Tell TypeScript 'e' is a React Mouse Event
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden mb-15 py-20 md:py-28 lg:py-36 px-6 md:px-10 lg:px-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
            {/* LEFT — Text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-black dark:text-white">
                IKMS – Multi Agent RAG Chat
              </h1>

              <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
                <span className="text-green-800 dark:text-green-700 font-bold">
                  Intelligent
                </span>{" "}
                Knowledge Management System
              </p>

              <p className="mt-6 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto lg:mx-0">
                Orchestrating retrieval, reasoning, and autonomous agents to transform
                enterprise knowledge into{" "}
                <span className="text-green-800 dark:text-green-700">
                  Intelligent
                </span>{" "}
                conversations.
              </p>
            </motion.div>

            {/* RIGHT — Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.8, delay: 0.2, ease: "easeOut" }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-xl rounded-[0.4rem] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">
                <img
                  src="/hero.png"
                  alt="AI knowledge flow visualization"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ChatUI Section with Modern Interactive Dotted Background */}
      <section 
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative w-full py-16 md:py-24 px-6 md:px-8 lg:px-12 bg-white dark:bg-black overflow-hidden min-h-[800px] flex items-center justify-center"
      >
        {/* 1. Base light dotted background */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#374151_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

        {/* 2. Interactive beautiful multi-color dots connected to cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out"
          style={{
            opacity: isHovering ? 0.5 : 0,
            background: "linear-gradient(135deg, #38bdf8, #818cf8, #c084fc, #e879f9, #34d399)",
            WebkitMaskImage: `
              radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent),
              radial-gradient(black 1.5px, transparent 1.5px)
            `,
            WebkitMaskSize: "100% 100%, 24px 24px",
            WebkitMaskPosition: "0 0, 0 0",
            WebkitMaskRepeat: "no-repeat, repeat",
            WebkitMaskComposite: "source-in",
            maskImage: `
              radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent),
              radial-gradient(black 1.5px, transparent 1.5px)
            `,
            maskSize: "100% 100%, 24px 24px",
            maskPosition: "0 0, 0 0",
            maskRepeat: "no-repeat, repeat",
            maskComposite: "intersect",
          }}
        />

        {/* 3. Main Content Layer */}
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <ChatUI />
        </div>
      </section>
    </main>
  );
}