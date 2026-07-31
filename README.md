## IKMS Frontend

<img src="/IKMS.png" alt="IKMS-Dashboard" />

- Project: Intelligent Knowledge Management System (Frontend)
- Purpose: UI for uploading PDFs, chatting with documents, and managing knowledge.

### **Quick Links**
- **Frontend (Live):** `https://ikms-lake.vercel.app`
- **Backend Repo:** `https://github.com/ravishanamina174/ikms-backend`
- **Backend (API):** `https://ikms-backend-6655.onrender.com`

### **User Guide**
- **Open the app:** Visit `https://ikms-lake.vercel.app` or run locally with `npm run dev`.
- **Upload PDFs:** Use the `Upload` widget to add documents. Supported formats: PDF.
- **Start a chat:** Open the chat UI and ask questions — the app queries the backend knowledge service and returns answers.
- **Toggle features:** Use the planning toggle to enable/disable experimental UI features.


### Architecture Overview
- **Stack:** Next.js (App Router), TypeScript, React, Vercel for deployment.
- **Structure:** `app/` contains pages and layout; `components/` contains UI pieces; `lib/api.ts` handles backend requests; `public/` holds static assets.

### Setup (Local)
- **Prerequisites:** Node 18+ and npm installed.
```bash```
- Install deps:    npm install
- Run dev server:  npm run dev
- Build:           npm run build
- Start (production):npm run start

### Deployment
- Deployed to Vercel (frontend). Backend hosted on Render. Ensure `NEXT_PUBLIC_API_URL` (if used) points to the backend API.


