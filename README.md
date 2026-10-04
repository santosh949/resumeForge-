# ResumeForge

Turn a resume into a polished personal portfolio website with AI.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://resume-to-portfolio-website.netlify.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Gemini](https://img.shields.io/badge/Google-Gemini_AI-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)

## Overview

ResumeForge is an AI-powered portfolio generator. It processes resume content and helps transform it into a clean, presentable portfolio experience without requiring the user to build a site manually.

**Live application:** https://resume-to-portfolio-website.netlify.app/

## Core Stack

- **Frontend:** React 19, React Router, Vite
- **Styling:** Tailwind CSS
- **AI:** Google Gemini
- **Resume processing:** PDF.js
- **Platform services:** Firebase
- **Deployment:** Netlify

## Key Capabilities

- Resume upload and PDF processing
- AI-assisted conversion of resume information into portfolio content
- Multiple visual templates and typography options
- Portfolio preview and publishing workflow
- Responsive browser-based experience

## Local Development

### Prerequisites

- Node.js 20 or newer
- npm
- Firebase project configuration
- Google Gemini API access

### Installation

```bash
git clone https://github.com/santosh949/resumeForge-.git
cd resumeForge-
npm install
npm run dev
```

The development server will print the local URL in the terminal.

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
resumeForge-/
├── src/                 # React application source
├── index.html           # Vite entry document
├── package.json         # Scripts and dependencies
└── vite.config.js       # Vite configuration
```

## Security Notes

- Never commit private API keys or Firebase service-account credentials.
- Keep environment-specific configuration outside source control.
- Restrict Gemini and Firebase credentials to the minimum permissions and permitted origins required by the application.

## Roadmap

- Add product screenshots and an animated walkthrough
- Expand portfolio templates
- Improve resume parsing and error handling
- Add automated tests and CI
- Add export and custom-domain guidance

## Author

Built by [Santhosh](https://github.com/santosh949).
