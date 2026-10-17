# Notes App

A multi-user notes application built with React and TypeScript. Users can register, log in, and manage their own notes: create, view, edit, delete, and search. Each user only sees their own notes.

This is a learning project built to practice a modern React stack: server state with TanStack Query, client state with Zustand, and schema-validated forms with React Hook Form and Zod.

> **Important:** Authentication in this project is simulated for learning purposes. It runs on `json-server`, passwords are stored as plain text in `db.json`, and there are no tokens or sessions on a server. Do not use real credentials, and do not use this approach in production.

## Features

- Register and log in with form validation
- Protected routes: notes pages redirect to the login page when no user is logged in
- Logged-in users are redirected away from the login and register pages
- Notes belong to the user who created them (each note stores a `userId`)
- Create, view, edit, and delete notes
- Search notes by title or content (case-insensitive)
- Light and dark theme, remembered between visits
- Loading, error, and empty states
- Logout clears the query cache so one user's notes are never shown to the next user

## Tech Stack

| Area | Tool |
|---|---|
| Framework | React with TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router |
| Server state | TanStack Query |
| Client state | Zustand (with the `persist` middleware) |
| Forms | React Hook Form |
| Validation | Zod |
| Mock API | json-server |

## How State Is Organized

The project follows one rule: **server data lives in TanStack Query, UI state lives in Zustand.**

- **TanStack Query** fetches, caches, and updates notes. Query keys include the user id for the list (`["notes", "list", userId]`) and the note id for details (`["notes", "detail", id]`). After a create, update, or delete, queries starting with `["notes"]` are invalidated so lists refresh.
- **Zustand** holds the search text and theme (`useUIStore`) and the current user (`useAuthStore`). The theme and the logged-in user are persisted to `localStorage`. The search text is not persisted.
- **Custom hooks** keep pages small: `useNotes`, `useNote`, `useNoteMutations`, and `useAuthMutations`.
- **Ownership check:** `useNote` rejects a note that does not belong to the current user and shows "Note not found".

## Getting Started

### Prerequisites

- Node.js (a recent LTS version)
- npm

### Installation

```bash
git clone https://github.com/Muller-TA/notes-app.git
cd notes-app
npm install
```

### Environment variables

Copy the example file and adjust it if needed:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Base URL of the json-server API | `http://localhost:3001` |

### Run the project

The app needs two processes running at the same time. Open two terminals.

Terminal 1, the mock API:

```bash
npm run server
```

Terminal 2, the frontend:

```bash
npm run dev
```

Then open the address Vite prints in the terminal (usually `http://localhost:5173`).

If you change `.env`, restart `npm run dev`, because Vite reads it only on startup.

### Demo account

You can register a new account from the Register page, or use the account included in `db.json`:

- Email: `demo@test.com`
- Password: `123456`

### Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run server` | Start json-server on port 3001 using `db.json` |
| `npm run build` | Type-check with TypeScript and build for production |

## Routes

| Path | Page | Access |
|---|---|---|
| `/` | Home (shows the number of notes) | Public |
| `/login` | Login | Public (redirects to `/notes` if logged in) |
| `/register` | Register | Public (redirects to `/notes` if logged in) |
| `/notes` | Notes list with search | Protected |
| `/notes/:id` | Note details and delete | Protected |
| `/notes/:id/edit` | Edit note | Protected |
| `/new` | Create note | Protected |
| `*` | Not found | Public |

## Validation Rules

| Form | Rules |
|---|---|
| Note | Title: at least 3 characters. Content: required |
| Login | Valid email. Password: at least 6 characters |
| Register | Username: at least 2 characters. Valid email. Password: at least 6 characters. Confirm password must match |

Registering with an email that already exists is rejected.

## Data Model

```ts
interface User {
  id: string;
  username: string;
  email: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO date
  userId: string;
}
```

The password is stored in `db.json` but is removed from the user object before it reaches the application state.

## Project Structure

```
notes-app/
  db.json              Mock database used by json-server
  .env.example         Example environment variables
  src/
    api/               Functions that talk to the API (notes and auth)
    components/        Shared components (navbar layout, protected route)
    hooks/             Custom hooks built on TanStack Query
    pages/             One file per route
    schemas/           Zod schemas and inferred form types
    store/             Zustand stores (UI and auth)
    types/             Shared TypeScript types
```

## Known Limitations

- Authentication is simulated, as described above. Passwords are not hashed, and the API does not enforce that a user can only access their own notes. The filtering and ownership checks happen in the frontend only.
- json-server cannot be hosted as a static site, so the app needs the mock API running to work.
- There are no automated tests yet.
- The notes list loads all of a user's notes at once, without pagination.

## Ideas for Future Work

- Replace json-server with a real backend (hashed passwords, token-based auth, server-side ownership checks)
- Add automated tests
- Add pagination or sorting for the notes list
- Deploy the frontend and the API

## Author

Mahmoud Mohammed (Muller)
GitHub: [Muller-TA](https://github.com/Muller-TA)
