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
          <div className="relative">
            {/* Stars */}
            <svg
              className="absolute -top-2 -left-4 w-6 h-6 text-[#1a4d3a] animate-pulse"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg
              className="absolute -top-2 -right-4 w-6 h-6 text-[#1a4d3a] animate-pulse"
              style={{ animationDelay: "0.5s" }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            
            {/* Robot */}
            <div className="w-32 h-32 mx-auto relative">
              {/* Robot Body */}
              <div className="w-24 h-24 bg-gradient-to-br from-[#1a4d3a] to-[#2d5f47] rounded-2xl mx-auto shadow-lg flex items-center justify-center relative">
                {/* Robot Face */}
                <div className="w-16 h-16 bg-white rounded-xl flex flex-col items-center justify-center gap-1">
                  {/* Eyes */}
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-[#1a4d3a] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#1a4d3a] rounded-full"></div>
                  </div>
                  {/* Mouth */}
                  <div className="w-8 h-1 bg-[#1a4d3a] rounded-full"></div>
                </div>
              </div>
              
              {/* Headset */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <div className="w-16 h-4 bg-gray-400 rounded-full"></div>
                </div>
              </div>
              
              {/* Speech Bubble */}
              <div className="absolute -right-8 top-4 bg-white dark:bg-white rounded-lg p-2 shadow-md border border-gray-200">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#1a4d3a] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-[#2d5f47] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-[#1a4d3a] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
                <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white dark:bg-white transform rotate-45 border-r border-b border-gray-200"></div>
              </div>
            </div>
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
              className="w-5 h-5 text-[#1a4d3a] flex-shrink-0"
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
              className="w-5 h-5 text-[#1a4d3a] flex-shrink-0"
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
              className="w-5 h-5 text-[#1a4d3a] flex-shrink-0"
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
