# ResumeForge

Turn a PDF resume into a polished, customizable portfolio website with AI.

[![Live app](https://img.shields.io/badge/Live_App-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://resume-to-portfolio-website.netlify.app/)
[![CI](https://github.com/santosh949/resumeForge-/actions/workflows/ci.yml/badge.svg)](https://github.com/santosh949/resumeForge-/actions/workflows/ci.yml)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)

## What it does

ResumeForge extracts content from an uploaded PDF resume, structures it with AI, and turns it into a hosted portfolio that can be edited, themed, previewed, and published from the browser.

### Highlights

- PDF text extraction with PDF.js
- AI-assisted resume categorization and portfolio content
- Firebase authentication and portfolio persistence
- Editable education, experience, projects, skills, and profile sections
- Recruiter-focused viewing mode
- Multiple responsive portfolio themes and visual variants
- Public portfolio publishing
- AI assistant for portfolio and resume questions

## Architecture

```text
PDF resume
   │
   ▼
React + PDF.js ──► Netlify Functions ──► Groq / Gemini
   │
   ├──► Content editor and theme engine
   │
   └──► Firebase Auth + Firestore ──► Published portfolio
```

The AI credentials are used only by Netlify Functions. They must not be exposed through `VITE_` variables or committed to the repository.

## Technology

| Area | Tools |
| --- | --- |
| Frontend | React 19, TypeScript, React Router, Vite |
| Styling | Tailwind CSS 4, custom theme engine |
| Resume processing | PDF.js, Zod |
| AI | Groq, Google Gemini |
| Platform | Firebase Authentication, Firestore |
| Serverless API | Netlify Functions |
| Deployment | Netlify |

## Run locally

### Requirements

- Node.js 20+
- npm
- A Firebase web application
- A Groq and/or Gemini API key

```bash
git clone https://github.com/santosh949/resumeForge-.git
cd resumeForge-
npm ci
cp .env.example .env
npm run dev
```

Fill `.env` with your own configuration:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

GROQ_API_KEY=
GEMINI_API_KEY=
```

For the full AI workflow, run through Netlify Dev so the serverless functions and environment variables are available:

```bash
npx netlify dev
```

## Validate a production build

```bash
npm run check
npm run preview
```

## Project layout

```text
src/
├── components/     Reusable editor and portfolio UI
├── config/         Firebase client configuration
├── context/        Authentication and theme state
├── pages/          Application routes and workflows
├── schemas/        Resume validation and defaults
├── services/       PDF, AI, storage, and analytics services
└── templates/      Portfolio renderer, themes, and variants

netlify/functions/  Server-side AI endpoints
firestore.rules     Firestore access rules
netlify.toml        Build and SPA routing configuration
```

## Security

- `.env`, Netlify local state, build output, and dependencies are ignored.
- Keep Groq and Gemini keys in Netlify environment variables.
- Firebase client configuration is public by design; enforce access through Firestore rules and authorized domains.
- Rotate any credential that has previously been committed or shared.

## Roadmap

- Add product screenshots and an animated walkthrough
- Add automated component and integration tests
- Improve bundle code splitting
- Expand accessibility and keyboard testing
- Add portfolio export and custom-domain guidance

## Author

Built by [Santhosh](https://github.com/santosh949).