# Frontend — React + Bootstrap (Assignment Submission)

This is a minimal React frontend scaffold using **React + Bootstrap + Simple CSS** for the Frontend Developer Task.
It includes pages and components for: Register, Login, Protected Dashboard, and CRUD placeholders.

## What this package contains
- Minimal React app (Create React App structure)
- Bootstrap integration (via npm)
- Simple CSS in `src/styles.css`
- Placeholder API integration using `src/api.js` (uses axios)
- Protected route example using React Router v6

## How to run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and set `REACT_APP_API_URL` to your backend (e.g. http://localhost:4000)
3. Start the dev server:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000`

## Notes
- This repo is intentionally minimal so you can plug in your backend easily.
- Add your backend under `/backend` and push both frontend and backend to GitHub.

## Files to add before submission
- `frontend/` (this project) and `backend/` (your API implementation)
- Postman collection and log files as required by the assignment

Good luck — if you want, I can also generate the backend (Node.js + Express + MongoDB) and connect it.
