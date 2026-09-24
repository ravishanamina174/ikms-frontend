// Use a local development URL by default and allow deployment override via Vercel env.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

type QAResponse = {
  answer: string
  plan?: string
  sub_questions?: string[]
  context?: string
}

async function requestJSON<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init)
  const body = await response.json().catch(() => ({}))

  if (!response.ok) {
    const detail = typeof body.detail === "string" ? body.detail : `Request failed with status ${response.status}`
    throw new Error(detail)
  }

  return body as T
}

export async function uploadPDF(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  return requestJSON<{ filename: string; chunks_indexed: number }>(`${API_URL}/index-pdf`, {
    method: "POST",
    body: formData,
  })
}

export async function askQuestion(
  question: string,
  use_planning: boolean
) {
  return requestJSON<QAResponse>(`${API_URL}/qa`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      use_planning,
    }),
  })
}
