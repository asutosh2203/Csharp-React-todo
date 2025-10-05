# 📝 .NET React To-Do List
A simple Todo List application with a **React frontend** and a **.NET 9 + PostgreSQL backend**.

---

## 🔍 Project Structure
- frontend/ → handles UI and CRUD calls to the backend API.
- backend/ → exposes REST endpoints for tasks and connects to PostgreSQL.

---

## ⚡ Features
- Add, update, and delete tasks ✅
- Mark tasks as complete/incomplete ✅
- Fully hooked to PostgreSQL via Entity Framework Core ✅
- Modern React UI with Tailwind CSS styling ✅

---

## 🛠 Prerequisites
**Before you dive in, you should have a basic understanding of:**
- React & React Hooks (useState, useEffect)
- JavaScript ES6+
- C# and minimal knowledge of .NET APIs
- SQL basics (PostgreSQL preferred)

**Required Software**
- Node.js (v18+) → for running the React frontend
- .NET 9 SDK → for the backend API
- PostgreSQL → database for storing tasks
- VS Code or your favorite editor → optional, but recommended

---

## 🚀 Getting Started
#### 1. Backend Setup
```bash
cd backend
dotnet restore       # Install .NET dependencies
dotnet ef database update  # Apply migrations to PostgreSQL
dotnet watch run     # Start the API on localhost
```

Make sure your PostgreSQL connection string is set in `appsettings.json` or via environment variables (`PG_CONNECTION`).

#### 2. Frontend Setup
```bash
cd frontend
npm install          # Install dependencies
npm start            # Start React app on localhost:3000
```

The frontend talks to the backend at `http://localhost:5001/`.

You can tweak ports if needed in `frontend/src/config.js` or the backend launch settings.

---

## 📂 Usage
- Open the React app → add tasks using the input box
- Check/uncheck tasks → marks them complete
- Edit or delete tasks → changes reflect in PostgreSQL
- All changes are persisted — no more sticky notes! 📝

---

## 🧩 Notes & Tips
- Using environment variables for PostgreSQL credentials is recommended (PG_CONNECTION).
- The backend is a minimal API — easy to extend for authentication, multi-user support, or fancy features.
- Frontend is small and modular — you can hack in Tailwind animations, filters, or a dark mode if you like!

---

## 📌 Want to explore more?

The full working code for both frontend and backend is right here.
Clone, run, and tweak. 🚀

---

## ❤️ A Little Fun

This is **not just a todo app** — it’s a tiny lab to experiment with:
- React + Tailwind tricks
- .NET minimal APIs
- PostgreSQL + EF Core
- Full-stack CRUD magic ✨

#### Read my full tutorial at: [dev.to/asutosh2001](https://dev.to/asutosh2001)
#### Also, don't forget to give it a star if you found it useful. ⭐
