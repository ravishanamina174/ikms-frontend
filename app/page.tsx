"use client";
import React from "react";
import ChatUI from "@/components/Chat/ChatUI";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-gray-50 dark:bg-[#09090b] flex flex-col items-center overflow-hidden selection:bg-green-500/30">
      
      {/* 1. Modern Background Pattern (Perspective Grid) */}
      <div className="absolute inset-0 pointer-events-none flex justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* 2. Top Ambient Glow */}
      <div className="absolute top-0 inset-x-0 h-[500px] pointer-events-none bg-gradient-to-b from-pink-400/10 via-transparent to-transparent dark:from-purple-300/10 dark:via-transparent dark:to-transparent" />

      {/* Hero Text Section */}
      <section className="relative z-10 w-full max-w-5xl mx-auto pt-24 md:pt-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white drop-shadow-sm">
            IKMS – Multi Agent RAG Chat
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
            <span className="text-orange-500 dark:text-blue-300 font-bold">
              Intelligent
            </span>{" "}
            Knowledge Management System
          </p>

          <p className="mt-6 text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Orchestrating retrieval, reasoning, and autonomous agents to transform
            enterprise knowledge into{" "}
            <span className="text-orange-400 dark:text-blue-300 font-semibold">
              Intelligent
            </span>{" "}
            conversations.
          </p>
        </motion.div>
      </section>

      {/* ChatUI Section with Tighter Lightning/Glow Effect */}
      <section className="relative z-10 w-full max-w-4xl mx-auto mt-16 md:mt-24 px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="relative w-full"
        >
          {/* Tight inner glow wrapping exactly around the ChatUI frame */}
          <div className="absolute inset-0 bg-orange-500/20 dark:bg-blue-500/25 blur-[40px] rounded-[1rem] pointer-events-none" />
          
          {/* Slightly wider ambient glow for a soft falloff */}
          <div className="absolute inset-[-30px] bg-green-400/10 dark:bg-blue-300/10 blur-[80px] rounded-[2rem] pointer-events-none" />

          {/* Main ChatUI Container */}
          <div className="relative z-10 w-full">
            <ChatUI />
          </div>
        </motion.div>
      </section>

    </main>
  );
}