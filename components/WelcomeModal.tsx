"use client"

import { useState } from "react"

interface WelcomeModalProps {
  onClose: () => void
}

export default function WelcomeModal({ onClose }: WelcomeModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false)

  const handleGetStarted = () => {
    if (dontShowAgain) {
      localStorage.setItem("welcomeModalShown", "true")
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 bg-opacity-50 backdrop-blur-sm dark:bg-black dark:bg-opacity-50">
      <div className="relative bg-white dark:bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8 animate-fadeIn z-10 border-2 border-gray-200 dark:border-gray-200">
        {/* Close Button */}
        <button
          onClick={handleGetStarted}
          className="absolute top-4 right-4 text-gray-600 hover:text-black dark:hover:text-black transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Robot Illustration */}
<div className="flex justify-center mb-6 relative">
          {/* Large Yellow Doodle Icon */}
          <div className="w-56 h-auto mx-auto drop-shadow-sm">
            <svg 
              className="w-full h-full"
              viewBox="0 0 140 80" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 1. Doodle Swoosh Lines */}
              <path 
                d="M 15 32 C 35 22, 60 18, 80 32" 
                stroke="#292929" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
              <path 
                d="M 32 42 C 45 33, 62 30, 80 43" 
                stroke="#292929" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />

              {/* 2. Yellow Circle Background */}
              <circle cx="100" cy="40" r="28" fill="#F6C764"/>

              {/* 3. Tilted Open Book Group */}
              <g transform="translate(100 40) rotate(-15)">
                {/* Book pages outline */}
                <path 
                  d="M -16,-12 Q -8,-17 0,-10 Q 8,-17 16,-12 L 13,14 Q 7,10 0,13 Q -7,10 -13,14 Z" 
                  fill="white" 
                  stroke="#292929" 
                  strokeWidth="2.5" 
                  strokeLinejoin="round" 
                  strokeLinecap="round"
                />
                {/* Center Spine Crease */}
                <path 
                  d="M 0,-10 L 0,13" 
                  stroke="#292929" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                />
                {/* Eyes on the pages */}
                <circle cx="-5.5" cy="-2" r="2" fill="#292929"/>
                <circle cx="5.5" cy="-2" r="2" fill="#292929"/>
              </g>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-black dark:text-black mb-4">
          Welcome to IKMS Multi Agent RAG Chat!
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 dark:text-gray-600 mb-6 text-sm leading-relaxed">
          Upload a PDF to start asking questions about its contents. Enable the planning agent for deeper reasoning, or turn it off for quicker answers.
        </p>

        {/* Features List */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-[#449e3e] flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-black dark:text-black text-sm">
              Upload your PDF documents
            </span>
          </div>
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-[#d6dc28] flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-black dark:text-black text-sm">
              Ask any questions about the content
            </span>
          </div>
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-[#e8b11a] flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-black dark:text-black text-sm">
              Enable "Planning" for deeper reasoning
            </span>
          </div>
        </div>

        {/* Get Started Button */}
        <button
          onClick={handleGetStarted}
          className="w-full bg-black dark:bg-black text-white dark:text-white py-3 px-6 rounded-lg font-semibold border-2 border-black dark:border-black shadow-lg hover:bg-gray-800 dark:hover:bg-gray-800 hover:shadow-xl transition-all duration-200 mb-4"
        >
          Let's get started
        </button>

        {/* Don't Show Again Checkbox */}
        <label className="flex items-center justify-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
            className="w-4 h-4 text-[#1a4d3a] dark:text-[#1a4d3a] border-gray-300 rounded focus:ring-[#1a4d3a] dark:focus:ring-[#1a4d3a]"
          />
          <span className="text-sm text-gray-600 dark:text-gray-600">
            Don't show again
          </span>
        </label>
      </div>
    </div>
  )
}
