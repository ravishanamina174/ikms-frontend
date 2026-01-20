## IKMS Frontend

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

### Code Documentation (Key files)
- **`app/`**: App Router pages and server components.
- **`app/layout.tsx`**: Global layout and providers.
- **`app/page.tsx`**: Main entry page for the application.
- **`components/WelcomeModal.tsx`**: Onboarding modal shown to new users.
- **`components/Chat/ChatUI.tsx`**: Chat interface connecting to the backend conversational API.
- **`components/Toggle/PlanningToggle.tsx`**: Small feature toggle used by the UI.
- **`components/Upload/PdfUpload.tsx`**: PDF upload UI and client-side validations.
- **`lib/api.ts`**: API helper functions and base URL usage.
- **`public/`**: Static images and icons.
