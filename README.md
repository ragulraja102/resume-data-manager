# Resume Data Manager

## Setup Instructions

### Backend
1. Navigate to the `backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend` with:
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/resume-manager
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   # or
   node server.js
   ```

### Frontend
1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Access
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## Features
- User Registration/Login
- Create, Read, Update, Delete Resumes
- Professional Dashboard
