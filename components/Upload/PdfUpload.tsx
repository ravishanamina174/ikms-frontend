"use client"

import { uploadPDF } from "@/lib/api"

export default function PdfUpload() {
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return
    await uploadPDF(e.target.files[0])
    alert("PDF indexed successfully")
  }

  return (
    <input
      type="file"
      accept="application/pdf"
      onChange={handleUpload}
    />
  )
}
