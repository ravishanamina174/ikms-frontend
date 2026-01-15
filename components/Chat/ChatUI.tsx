"use client"

import { useState, useRef, useEffect } from "react"
import { askQuestion, uploadPDF } from "@/lib/api"
import PlanningToggle from "@/components/Toggle/PlanningToggle"

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: number
}

export default function ChatUI() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [usePlanning, setUsePlanning] = useState(true)
  const [loading, setLoading] = useState(false)
  const [messageId, setMessageId] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  async function sendMessage() {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput("") // Clear input immediately
    setLoading(true)

    // Show user message immediately with animation
    const newUserMessage: Message = {
      id: messageId,
      text: userMessage,
      isUser: true,
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, newUserMessage])
    setMessageId((prev) => prev + 1)

    try {
      const res = await askQuestion(userMessage, usePlanning)
      const data = await res.json()

      // Show AI response with animation
      const aiMessage: Message = {
        id: messageId + 1,
        text: data.answer,
        isUser: false,
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setMessageId((prev) => prev + 2)
    } catch (err) {
      const errorMessage: Message = {
        id: messageId + 1,
        text: "Error occurred while answering.",
        isUser: false,
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, errorMessage])
      setMessageId((prev) => prev + 2)
    } finally {
      setLoading(false)
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return
    try {
      await uploadPDF(e.target.files[0])
      alert("PDF indexed successfully")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (err) {
      alert("Error uploading PDF")
    }
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Toggle */}
      <div className="flex justify-center">
        <PlanningToggle
          value={usePlanning}
          onChange={setUsePlanning}
        />
      </div>

      {/* Chat Frame */}
      <div className="gradient-bg chat-frame rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
        {/* Chat Messages Area */}
        <div className="h-[500px] overflow-y-auto custom-scrollbar p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-black dark:bg-white flex items-center justify-center shadow-lg">
                <svg
                  className="w-10 h-10 text-white dark:text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Let the Data Speak
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Ask questions about your document and get intelligent answers powered by AI
              </p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message-enter flex items-start gap-3 ${message.isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                    message.isUser 
                      ? "bg-black dark:bg-white" 
                      : "bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600"
                  }`}>
                    {message.isUser ? (
                      <svg
                        className="w-6 h-6 text-white dark:text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-gray-700 dark:text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`flex-1 max-w-[75%] ${
                    message.isUser ? "flex justify-end" : "flex justify-start"
                  }`}>
                    <div
                      className={`px-5 py-3.5 shadow-md ${
                        message.isUser
                          ? "bg-black dark:bg-white text-white dark:text-black rounded-3xl rounded-tr-sm"
                          : "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-3xl rounded-tl-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-start gap-3 message-typing">
                  {/* Robot Avatar */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center shadow-md">
                    <svg
                      className="w-6 h-6 text-gray-700 dark:text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 rounded-3xl rounded-tl-sm px-5 py-3.5 shadow-md">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1.5">
                        <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <div className="flex items-center gap-3">
            {/* File Upload Button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="button-click flex items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </label>

            {/* Text Input */}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 h-12 px-5 rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all duration-200"
              placeholder="What's your next insight? Ask and find out."
            />

            {/* Send Button */}
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="button-click flex items-center justify-center w-12 h-12 rounded-2xl bg-black dark:bg-white text-white dark:text-black shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {loading ? (
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
