"use client"

import { uploadPDF } from "@/lib/api"

export default function PdfUpload() {
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const result = await uploadPDF(file)
      alert(`PDF indexed successfully (${result.chunks_indexed} chunks)`)
    } catch (error) {
      const message = error instanceof Error ? error.message : "PDF upload failed."
      alert(message)
    }
  }

  return (
    <input
      type="file"
      accept="application/pdf"
      onChange={handleUpload}
    />
  )
}
