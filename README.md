# 🎥 Scopetok

A clean, responsive video browsing platform built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

Scopetok allows users to:

- Browse and watch videos.
- View and post comments.
- Upload new videos with title, description, and URL.
- Navigate between pages using a sidebar layout.
- Experience a splash screen on startup.

---

## Features

### 🧭 Navigation

- Persistent sidebar (`NavBar`) with smooth open/close animation.
- Dynamic routing between **Home**, **New Video**, and **Info** pages.

### 🎬 Video Player

- Integrated video player supporting a variety of URLs, including file paths, HLS, DASH, Youtok, Vimeo, Wistia and Mux
- Displays video title and description with centered caption and comments below.

### 💬 Comments

- Fetches comments for selected video.
- Allows posting new comments instantly.
- Displays 'time ago' that the comment was created.

### 📤 Upload

- Users can submit a **title**, **description**, and **video URL**.
- Input validation ensures valid video URLs before submission.

### 💡 Info Page

- Overview of the Scopetok app, purpose, and technologies used.

### ✨ Splash Page

- 3-second branded splash overlay with loader dots.
- Keeping the NavBar visible for UX.

## 🧑‍💻 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/scopetok.git
cd scopetok
```

### 2. Change the user_id

in src/app/page.tsx change the USER_ID variable to an appropriate value

### 3. Start the app

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 4. Open

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
