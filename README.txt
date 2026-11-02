Smart Hostel Resource & Complaint Management System

A database-driven hostel management platform designed to simplify and centralize hostel operations, including student records, room allocation, complaint handling, fee management, staff coordination, visitor tracking, and resource monitoring.

## Overview

HostelOS provides a centralized platform for managing essential hostel activities through a role-based interface for students, staff, and administrators.

The system connects an interactive frontend to a MySQL database through a Node.js and Express.js backend. It uses relational database concepts, SQL queries, constraints, views, and triggers to maintain structured and consistent hostel records.

## Key Features

### Student Portal
- View student and hostel-related information.
- Access room allocation details.
- Submit and track hostel complaints.
- View payment information.
- Access visitor records.

### Admin Dashboard
- Manage student and staff records.
- Monitor hostel and room availability.
- Manage complaints and their assignments.
- View and manage hostel fees and payments.
- Monitor hostel resource usage.
- Manage visitor records and logs.

### Staff Dashboard
- View assigned complaints.
- Access complaint details.
- Track complaint status and resolution information.

### Database Management
- Relational database consisting of 11 interconnected tables.
- Primary key and foreign key constraints.
- Data validation using SQL constraints.
- Views for hostel occupancy, pending payments, and active complaints.
- Triggers for payment validation and automatic room-status updates.
- SQL queries involving joins, filtering, aggregation, and subqueries.

## Technology Stack

| Component | Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MySQL |
| Database Connectivity | MySQL2 |
| API Communication | REST APIs |
| Development Tools | MySQL Workbench, VS Code, Git |

## Project Structure

```text
hostel-project/
│
├── database/
│   └── hostel_db.sql
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── students.js
│   │   ├── hostels.js
│   │   ├── rooms.js
│   │   ├── beds.js
│   │   ├── staff.js
│   │   ├── complaints.js
│   │   ├── payments.js
│   │   ├── resourceUsage.js
│   │   ├── hostelFees.js
│   │   ├── visitors.js
│   │   └── visitorLogs.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── index.html
    ├── styles/
    │   └── main.css
    └── pages/
        ├── login.html
        ├── student-dashboard.html
        ├── admin-dashboard.html
        └── staff-dashboard.html
```

## Database Design

The system uses 11 relational tables:

| Table | Purpose |
|---|---|
| HOSTEL | Stores hostel details |
| ROOM | Maintains room information and availability |
| BED | Manages individual bed allocations |
| STUDENT | Stores student information |
| STAFF | Maintains staff records |
| COMPLAINT | Tracks student complaints |
| PAYMENT | Records student payments |
| RESOURCE_USAGE | Stores electricity, water, and internet usage |
| HOSTEL_FEE | Maintains hostel fee details |
| VISITOR | Stores visitor information |
| VISITOR_LOG | Records visitor entry and exit details |

### Database Concepts Implemented

- Entity relationships and relational schema design.
- Primary keys, foreign keys, and referential integrity.
- Weak entities and composite primary keys.
- Data normalization.
- SQL joins, aggregate functions, and subqueries.
- Views for simplified data retrieval.
- Triggers for automated database operations.
- Constraints for data validation.

## Installation and Setup

Follow these steps to run the project locally.

### Prerequisites

Make sure the following are installed:

- Node.js and npm
- MySQL Server
- MySQL Workbench
- Visual Studio Code
- Live Server extension for VS Code

### 1. Clone the Repository

```bash
git clone https://github.com/USERNAME/REPOSITORY.git
```

Navigate to the project directory:

```bash
cd hostel-project
```

### 2. Set Up the Database

1. Open MySQL Workbench.
2. Open `database/hostel_db.sql`.
3. Execute the complete SQL script.
4. Verify that the database `HostelManagementDB` and its 11 tables have been created successfully.

The script also inserts sample records and creates the required views and triggers.

### 3. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
```

Create a `.env` file with your local MySQL configuration:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=HostelManagementDB
PORT=5000
```

Replace `your_mysql_password` with your MySQL password.

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Backend Server

For development:

```bash
npm run dev
```

Alternatively:

```bash
npm start
```

The backend server runs at:

```text
http://localhost:5000
```

You should see a message indicating that the server has started. The database connection is also checked when the backend initializes.

### 6. Launch the Frontend

1. Open the `frontend` folder in VS Code.
2. Install the Live Server extension if it is not already installed.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

The application should open at:

```text
http://127.0.0.1:5500
```

Keep the backend server running while using the application.

## API Endpoints

The backend exposes REST API endpoints for interacting with the database.

| Module | HTTP Methods | Endpoint |
|---|---|---|
| Authentication | POST | `/api/auth/login` |
| Students | GET, POST, PUT, DELETE | `/api/students` |
| Hostels | GET, POST | `/api/hostels` |
| Rooms | GET, POST, PUT | `/api/rooms` |
| Beds | GET, POST, PUT | `/api/beds` |
| Staff | GET, POST, PUT, DELETE | `/api/staff` |
| Complaints | GET, POST, PUT, DELETE | `/api/complaints` |
| Payments | GET, POST, PUT | `/api/payments` |
| Resource Usage | GET, POST | `/api/resource-usage` |
| Hostel Fees | GET, POST, PUT | `/api/hostel-fees` |
| Visitors | GET, POST | `/api/visitors` |
| Visitor Logs | GET, POST, PUT | `/api/visitor-logs` |

Additional query parameters support filtering records by relevant attributes such as student ID, room ID, complaint status, and payment status.

## Sample Login Accounts

The SQL script includes sample student and staff records.

| Role | Email |
|---|---|
| Student | ananya@gmail.com |
| Staff | rajesh@hostel.com |
| Admin | admin@hostel.com |

**Note:** This is an academic prototype. The current login implementation uses email and role-based lookup and does not validate passwords. It should not be deployed with real user accounts or sensitive information without implementing proper authentication and authorization.

## Future Enhancements

- Implement secure authentication and role-based access control.
- Introduce automated payment processing and notifications.
- Add advanced resource consumption analytics.
- Integrate complaint status notifications.
- Improve reporting through interactive dashboards.
- Deploy the application to a cloud-based environment.

## Project Information

**Project:** Smart Hostel Resource & Complaint Management System  
**Project Name:** HostelOS  
**Course:** 21CSC205P – Database Management Systems  
**Database:** MySQL  
**Architecture:** Frontend – Backend – Database
