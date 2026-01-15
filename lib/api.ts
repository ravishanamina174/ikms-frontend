const API_URL = process.env.NEXT_PUBLIC_API_URL

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
