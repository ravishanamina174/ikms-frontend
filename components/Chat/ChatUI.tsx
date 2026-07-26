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
    const file = e.target.files?.[0]
    if (!file) return
    
    try {
      await uploadPDF(file)
      setPdfUploaded(true)
      alert("PDF indexed successfully")
    } catch (err) {
      console.error("Upload error details:", err)
      alert("Error uploading PDF. Please check your backend connection.")
    } finally {
      if (e.target) {
        e.target.value = ""
      }
    }
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Doodle Art Bot SVG component
  const BotDoodleIcon = () => (
    <svg 
      className="h-10 w-auto -ml-8 drop-shadow-sm text-[#292929] dark:text-gray-300" 
      viewBox="0 0 140 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M 15 32 C 35 22, 60 18, 80 32" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M 32 42 C 45 33, 62 30, 80 43" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />

      <circle cx="100" cy="40" r="28" fill="#F6C764"/>

      <g transform="translate(100 40) rotate(-15)">
        <path 
          d="M -16,-12 Q -8,-17 0,-10 Q 8,-17 16,-12 L 13,14 Q 7,10 0,13 Q -7,10 -13,14 Z" 
          fill="white" 
          stroke="#292929" 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
          strokeLinecap="round"
        />
        <path 
          d="M 0,-10 L 0,13" 
          stroke="#292929" 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
        <circle cx="-5.5" cy="-2" r="2" fill="#292929"/>
        <circle cx="5.5" cy="-2" r="2" fill="#292929"/>
      </g>
    </svg>
  );

  return (
    <>
      {showWelcomeModal && (
        <WelcomeModal onClose={() => setShowWelcomeModal(false)} />
      )}
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
        {/* Chat Frame - Modern Light & Dark Look */}
        <div className="bg-white dark:bg-[#0A0A0A] rounded-[0.7rem] border border-gray-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none overflow-hidden flex flex-col">
          
          {/* Header Area */}
          <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-white dark:bg-[#0A0A0A]">
            <div className="flex items-center gap-3 pl-1">
              <div>
                <h2 className="text-[0.9rem] font-semibold text-gray-900 dark:text-gray-100">Assistant</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Document Q&A</p>
              </div>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="h-[500px] overflow-y-auto custom-scrollbar p-6 space-y-6 bg-[#fafafa]/30 dark:bg-[#111111]">
            {messages.length === 0 ? (
              <div className="flex flex-col items-start justify-start h-full">
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/5 shadow-sm flex items-center justify-center flex-shrink-0">
                    <BotDoodleIcon />
                  </div>
                  <div className="px-4 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/5 rounded-[0.4rem] text-sm text-gray-700 dark:text-gray-200 shadow-sm">
                    Ask me something!
                  </div>
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
                    {!message.isUser && (
                      <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/5 shadow-sm flex items-center justify-center flex-shrink-0 mt-1">
                        <BotDoodleIcon />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div className={`flex-1 max-w-[80%] ${message.isUser ? "flex justify-end" : "flex justify-start"}`}>
                      <div
                        className={`px-4 py-2.5 text-sm leading-relaxed transition-all duration-200 ${
                          message.isUser
                            ? "bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-100 rounded-2xl"
                            : "bg-white dark:bg-[#1A1A1A] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm"
                        }`}
                      >
                        {message.isUser ? (
                          <p className="whitespace-pre-wrap">{message.text}</p>
                        ) : (
                          <div className="space-y-3">
                            {/* Search Plan */}
                            {message.plan ? (
                              <div className="pb-2 border-b border-gray-100 dark:border-white/10">
                                <div className="text-xs text-gray-400 dark:text-gray-500 mb-1 font-medium tracking-wide uppercase">Plan</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{message.plan}</div>
                              </div>
                            ) : null}

                            {/* Sub-Questions */}
                            {message.sub_questions && message.sub_questions.length > 0 ? (
                              <div className={`pb-2 ${message.plan ? "" : "border-b border-gray-100 dark:border-white/10"}`}>
                                <div className="text-xs text-gray-400 dark:text-gray-500 mb-1 font-medium tracking-wide uppercase">Sub-Questions</div>
                                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                                  {message.sub_questions.map((q, idx) => (
                                    <li key={idx} className="mb-1 whitespace-pre-wrap">{q}</li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}

                            {/* Final Answer */}
                            <div>
                              <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{message.text}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center gap-3 message-typing">
                    <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/5 shadow-sm flex items-center justify-center flex-shrink-0">
                      <BotDoodleIcon />
                    </div>
                    <div className="px-4 py-3 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm flex items-center space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Seamless Input Bar */}
          <div className="border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-3">
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 overflow-y-auto max-h-32 sm:max-h-none custom-scrollbar">
              
              {/* Minimal Upload Button */}
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
                title="Upload PDF"
                className={`flex items-center justify-center w-10 h-10 rounded-md cursor-pointer transition-colors flex-shrink-0 ${
                  pdfUploaded
                    ? "text-green-500 bg-green-50 dark:bg-green-500/10 dark:text-green-400"
                    : "text-gray-400 bg-gray-200 hover:text-gray-700 hover:bg-gray-300 dark:bg-white/5 dark:hover:bg-white/10 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {pdfUploaded ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  )}
                </svg>
              </label>

              {/* Seamless Text Input */}
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 min-w-[120px] h-10 bg-transparent border-none text-gray-800 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0"
                placeholder="Ask me something or..."
              />

              {/* Minimal Planning Toggle */}
              <div className="flex items-center h-10 px-2 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-[0.5rem] shadow-sm flex-shrink-0">
                <PlanningToggle
                  value={usePlanning}
                  onChange={setUsePlanning}
                />
              </div>

              {/* Modern Send Button */}
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="flex items-center justify-center w-10 h-10 rounded-md bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-[#1A1A1A] transition-colors flex-shrink-0"
              >
                {loading ? (
                  <svg className="w-4 h-4 animate-spin text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
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