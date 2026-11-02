=====================================================
  SMART HOSTEL RESOURCE & COMPLAINT MANAGEMENT SYSTEM
  21CSC205P — DBMS Mini Project
=====================================================

FOLDER STRUCTURE:
  hostel-project/
  ├── database/
  │   └── hostel_db.sql        ← Run this in MySQL first
  ├── backend/
  │   ├── server.js            ← Main API server
  │   ├── .env                 ← Set your DB password here
  │   ├── package.json
  │   ├── config/db.js
  │   └── routes/              ← One file per DB table
  └── frontend/
      ├── index.html           ← Landing page
      ├── styles/main.css
      └── pages/
          ├── login.html
          ├── student-dashboard.html
          ├── admin-dashboard.html
          └── staff-dashboard.html

=====================================================
SETUP — DO THIS IN ORDER:
=====================================================

STEP 1: SETUP DATABASE
  - Open MySQL Workbench
  - Open database/hostel_db.sql
  - Click the lightning bolt (Run All)
  - You should see "Database setup complete!"

STEP 2: CONFIGURE BACKEND
  - Open backend/.env in VS Code
  - Change: DB_PASSWORD=your_mysql_password_here
  - Save the file

STEP 3: INSTALL & RUN BACKEND
  - Open VS Code Terminal (Ctrl + `)
  - Type: cd backend
  - Type: npm install
  - Type: npm run dev
  - You should see: ✅ MySQL connected! + 🚀 Backend running

STEP 4: OPEN FRONTEND
  - Install "Live Server" extension in VS Code
  - Right-click frontend/index.html
  - Click "Open with Live Server"
  - Browser opens at http://127.0.0.1:5500

=====================================================
LOGIN CREDENTIALS (from your SQL data):
=====================================================
  Student:  ananya@gmail.com   (any password)
  Staff:    rajesh@hostel.com  (any password)
  Admin:    admin@hostel.com   (any password)

=====================================================
API ENDPOINTS (backend runs on port 5000):
=====================================================
  GET  /api/students
  POST /api/students
  GET  /api/complaints?student_id=1
  POST /api/complaints
  PUT  /api/complaints/:id
  GET  /api/payments?student_id=1
  POST /api/payments
  GET  /api/staff/:id/complaints
  GET  /api/rooms?status=Available
  GET  /api/hostels
  GET  /api/resource-usage?room_id=201
  GET  /api/hostel-fees
  GET  /api/visitor-logs?student_id=1
  POST /api/auth/login

=====================================================
COMMON ERRORS:
=====================================================
  "Cannot reach server"   → Run npm run dev in backend folder
  "MySQL FAILED"          → Wrong password in backend/.env
  "Table doesn't exist"   → Run hostel_db.sql in MySQL Workbench
  CORS error              → Make sure backend is running on port 5000
