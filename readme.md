# Project Setup Guide

## Backend (Python/Flask)

1. **Navigate to Backend folder:**
   ```bash
   cd "Backend"
   ```
2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   # On Windows Bash:
   source venv/Scripts/activate
   ```
3. **Install dependencies:**
   ```bash
   pip install -r requirement.txt
   ```
4. **Start the backend server:**
   ```bash
   cd ..
   python -m Backend.app
   ```
   The backend will run at `http://127.0.0.1:5000`.

---

## Frontend (React/Vite)

1. **Navigate to Practice folder:**
   ```bash
   cd "Practice"
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the frontend server:**
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173` (default Vite port).

---

## Notes

- Make sure MongoDB is running locally or update the backend config for remote DB.
- The frontend expects the backend to be running at `http://127.0.0.1:5000`.
- For API endpoints, see the backend code in `Backend/routes/items.py`.
