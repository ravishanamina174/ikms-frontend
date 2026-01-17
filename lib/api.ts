// Use the public env var when available, otherwise fall back to the deployed backend URL
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ikms-backend-6655.onrender.com"

export async function uploadPDF(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  return fetch(`${API_URL}/index-pdf`, {
    method: "POST",
    body: formData,
  })
}

export async function askQuestion(
  question: string,
  use_planning: boolean
) {
  return fetch(`${API_URL}/qa`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      use_planning,
    }),
  })
}
