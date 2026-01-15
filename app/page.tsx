import ChatUI from "@/components/Chat/ChatUI"
import PdfUpload from "@/components/Upload/PdfUpload"
import PlanningToggle from "@/components/Toggle/PlanningToggle"

export default function Home() {
  return (
    <main className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">
        IKMS – Multi Agent RAG Chat
      </h1>

      <PdfUpload />
      <ChatUI />
    </main>
  )
}
