import ChatUI from "@/components/Chat/ChatUI"

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            IKMS – Multi Agent RAG Chat
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Intelligent Knowledge Management System
          </p>
        </div>
        <ChatUI />
      </div>
    </main>
  )
}
