# CareerPath AI — Full Stack

This package contains the CareerPath AI frontend and backend in one project.

## IMPORTANT: correct folder

After extracting this ZIP, the folder you open in PowerShell must directly contain:

- `package.json`
- `frontend/`
- `backend/`

Do NOT run npm commands one level above this folder.

## Windows PowerShell setup

From the project root:

```powershell
npm install
npm run install:all
npm run dev
```

Or, if you want to run them separately:

```powershell
npm run dev:backend
```

and in another PowerShell window:

```powershell
npm run dev:frontend
```

## URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health check: http://localhost:5000/api/health

## Environment

Create `backend/.env` from `backend/.env.example`.

Create `frontend/.env` from `frontend/.env.example` only if the frontend requires additional local variables.

Never commit Firebase Admin service-account JSON files or private keys.

## Folder structure

```text
CareerPath_AI_FullStack/
├── package.json
├── frontend/
│   ├── package.json
│   └── src/
├── backend/
│   ├── package.json
│   ├── server.ts
│   └── src/
└── README.md
```

## Career Roadmap Design Update

The Career Roadmap page keeps the existing functionality and data, but its level presentation has been changed to a winding, milestone-style layout inspired by the supplied hand-drawn reference: large numbered milestones, a dotted winding trail, circular completion/active/locked markers, and larger roadmap cards. No backend/API behavior was changed for this visual update.
