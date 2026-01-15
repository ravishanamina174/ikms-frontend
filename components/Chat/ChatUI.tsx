"use client"

import { useState } from "react"
import { askQuestion } from "@/lib/api"
import PlanningToggle from "@/components/Toggle/PlanningToggle"

export default function ChatUI() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<string[]>([])
  const [usePlanning, setUsePlanning] = useState(true)
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!input.trim()) return

    setLoading(true)

    // Show user message immediately
    setMessages((prev) => [...prev, `You: ${input}`])

    try {
      const res = await askQuestion(input, usePlanning)
      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        `AI: ${data.answer}`,
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        "AI: Error occurred while answering.",
      ])
    } finally {
      setLoading(false)
      setInput("")
    }
  }

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <PlanningToggle
        value={usePlanning}
        onChange={setUsePlanning}
      />

      {/* Chat Messages */}
      <div className="border rounded p-4 h-72 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}

        {loading && <p>AI is thinking...</p>}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Ask about your document..."
        />

        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2"
        >
          Send
        </button>
      </div>
    </div>
  )
}
