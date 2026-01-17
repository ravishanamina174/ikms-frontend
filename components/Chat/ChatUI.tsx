"use client"

import { useState, useRef, useEffect } from "react"
import { askQuestion, uploadPDF } from "@/lib/api"
import PlanningToggle from "@/components/Toggle/PlanningToggle"
import WelcomeModal from "@/components/WelcomeModal"

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: number
  plan?: string | null
  sub_questions?: string[] | null
  context?: string | null
}

export default function ChatUI() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [usePlanning, setUsePlanning] = useState(true)
  const [loading, setLoading] = useState(false)
  const [messageId, setMessageId] = useState(0)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [pdfUploaded, setPdfUploaded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("welcomeModalShown")
    if (!hasSeenModal) {
      setShowWelcomeModal(true)
    }
  }, [])

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
        plan: data.plan ?? null,
        sub_questions: data.sub_questions ?? null,
        context: data.context ?? null,
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
      setPdfUploaded(true)
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
    <>
      {showWelcomeModal && (
        <WelcomeModal onClose={() => setShowWelcomeModal(false)} />
      )}
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {/* Chat Frame */}
        <div className="bg-white chat-frame rounded-2xl bg-white dark:bg-white border border-gray-200 dark:border-gray-200 overflow-hidden shadow-xl">
        {/* Chat Messages Area */}
        <div className="h-[500px] overflow-y-auto custom-scrollbar p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="relative">
                {/* Modern AI Icon with dark green gradient */}
                <div className="w-28 h-28 bg-gradient-to-br from-[#1a4d3a] via-[#2d5f47] to-[#1a4d3a] rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M6.343 6.343l-.707.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                {/* Modern floating particles with dark green */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#2d5f47] rounded-full animate-pulse shadow-lg" style={{ animationDelay: "0s" }}></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-[#1a4d3a] rounded-full animate-pulse shadow-lg" style={{ animationDelay: "0.7s" }}></div>
                <div className="absolute top-1/2 -right-3 w-3 h-3 bg-[#2d5f47] rounded-full animate-pulse shadow-lg" style={{ animationDelay: "1.4s" }}></div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-black dark:text-black mb-3">
                  Let the Data Speak
                </h3>
                <p className="text-gray-600 dark:text-gray-600 max-w-md text-base leading-relaxed">
                  Ask questions about your document and get intelligent answers powered by AI
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message-enter flex items-start gap-3 ${message.isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${
                    message.isUser 
                      ? "bg-gray-500 dark:from-black dark:to-gray-800" 
                      : "bg-gradient-to-br from-[#1a4d3a] to-[#2d5f47] dark:from-[#1a4d3a] dark:to-[#2d5f47]"
                  }`}>
                    {message.isUser ? (
                      <svg
                        className="w-5 h-5 text-white"
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
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M6.343 6.343l-.707.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`flex-1 max-w-[75%] ${
                    message.isUser ? "flex justify-end" : "flex justify-start"
                  }`}>
                    <div
                      className={`px-4 py-3 shadow-lg transition-all duration-200 ${
                        message.isUser
                          ? "bg-gray-100  text-black rounded-2xl rounded-tr-sm"
                          : "bg-white dark:bg-white text-black  border border-gray-200 dark:border-gray-200 rounded-2xl rounded-tl-sm"
                      }`}
                    >
                      {message.isUser ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.text}
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {/* Fake visual flow bar (informational only) */}
                          <div className="flex items-center text-xs text-gray-500 space-x-2 mb-1">
                            <div className="px-2 py-1 rounded-full bg-gray-100 text-gray-600">Planning</div>
                            <div className="text-gray-400">→</div>
                            <div className="px-2 py-1 rounded-full bg-gray-100 text-gray-600">Retrieval</div>
                            <div className="text-gray-400">→</div>
                            <div className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-semibold">Answer</div>
                          </div>

                          {/* Search Plan (REAL DATA) */}
                          {message.plan ? (
                            <div className="pt-2 border-t border-gray-100">
                              <div className="text-xs text-gray-500 mb-1">🧠 <span className="font-medium">Search Plan</span></div>
                              <div className="text-sm text-gray-800 whitespace-pre-wrap">{message.plan}</div>
                            </div>
                          ) : null}

                          {/* Sub-Questions (REAL DATA) */}
                          {message.sub_questions && message.sub_questions.length > 0 ? (
                            <div className={`pt-2 ${message.plan ? "border-t border-gray-100" : ""}`}>
                              <div className="text-xs text-gray-500 mb-1">🔍 <span className="font-medium">Sub-Questions</span></div>
                              <ul className="list-disc list-inside text-sm text-gray-700">
                                {message.sub_questions.map((q, idx) => (
                                  <li key={idx} className="mb-1 whitespace-pre-wrap">{q}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null}

                          {/* Final Answer (REAL DATA) — visually dominant */}
                          <div className="pt-2 border-t border-gray-100">
                            <div className="text-xs text-gray-500 mb-1">✅ <span className="font-medium">Final Answer</span></div>
                            <p className="text-sm font-semibold leading-relaxed whitespace-pre-wrap text-black">{message.text}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-start gap-3 message-typing">
                  {/* Robot Avatar */}
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#1a4d3a] to-[#2d5f47] dark:from-[#1a4d3a] dark:to-[#2d5f47] flex items-center justify-center shadow-lg animate-pulse">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M6.343 6.343l-.707.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div className="bg-white dark:bg-white border border-gray-200 dark:border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1.5">
                        <div className="w-2 h-2 bg-[#1a4d3a] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-[#2d5f47] rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
                        <div className="w-2 h-2 bg-[#1a4d3a] rounded-full animate-bounce" style={{ animationDelay: "400ms" }}></div>
                      </div>
                      <span className="text-sm text-black dark:text-black font-medium">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Bar */}
        <div className="border-t border-gray-200 dark:border-gray-200 bg-white dark:bg-white p-4">
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
              className={`button-click flex items-center justify-center px-4 h-10 rounded-xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm ${
                pdfUploaded
                  ? "bg-gray-100 dark:bg-gray-100 text-gray-600 dark:text-gray-600 border border-gray-300 dark:border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-200"
                  : "bg-black text-white dark:text-white border border-black dark:border-black hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-200 dark:hover:to-gray-700"
              }`}
            >
              <svg
                className={`w-5 h-5 mr-2 ${pdfUploaded ? "text-gray-600 dark:text-gray-600" : "text-white"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {pdfUploaded ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                )}
              </svg>
              {pdfUploaded ? "PDF Uploaded" : "Upload PDF"}
            </label>

            {/* Toggle next to Upload */}
            <div className="flex items-center">
              <PlanningToggle
                value={usePlanning}
                onChange={setUsePlanning}
              />
            </div>

            {/* Text Input */}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 h-10 px-4 rounded-xl border border-gray-300 dark:border-gray-300 bg-white dark:bg-white text-black dark:text-black placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a4d3a] focus:border-[#1a4d3a] transition-all duration-200 shadow-sm"
              placeholder="Ask a question about the content..."
            />

            {/* Send Button */}
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="button-click flex items-center justify-center w-11 h-10 rounded-xl bg-black dark:from-black dark:to-gray-800 text-white dark:text-white border border-black dark:border-black shadow-md hover:shadow-lg hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-800 dark:hover:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
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
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
