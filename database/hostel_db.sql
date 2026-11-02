-- ============================================================
-- Smart Hostel Resource & Complaint Management System
-- Complete Database Setup — Run this in MySQL Workbench
-- ============================================================

CREATE DATABASE IF NOT EXISTS HostelManagementDB;
USE HostelManagementDB;

-- ── DROP TABLES (in reverse FK order) ───────────────────────
DROP TABLE IF EXISTS VISITOR_LOG;
DROP TABLE IF EXISTS VISITOR;
DROP TABLE IF EXISTS HOSTEL_FEE;
DROP TABLE IF EXISTS RESOURCE_USAGE;
DROP TABLE IF EXISTS PAYMENT;
DROP TABLE IF EXISTS COMPLAINT;
DROP TABLE IF EXISTS BED;
DROP TABLE IF EXISTS STUDENT;
DROP TABLE IF EXISTS STAFF;
DROP TABLE IF EXISTS ROOM;
DROP TABLE IF EXISTS HOSTEL;

-- ── 1. HOSTEL ────────────────────────────────────────────────
CREATE TABLE HOSTEL (
  HostelID   INT PRIMARY KEY,
  HostelName VARCHAR(100) NOT NULL,
  Block      VARCHAR(50),
  Street     VARCHAR(100),
  City       VARCHAR(50),
  State      VARCHAR(50),
  Zip        VARCHAR(10)
);

-- ── 2. ROOM ──────────────────────────────────────────────────
CREATE TABLE ROOM (
  RoomID       INT PRIMARY KEY,
  RoomNumber   VARCHAR(10) NOT NULL,
  Floor        INT,
  Capacity     INT NOT NULL,
  Room_Type    VARCHAR(50),
  Status       VARCHAR(20) DEFAULT 'Available',
  Monthly_Rent DECIMAL(10,2),
  HostelID     INT,
  FOREIGN KEY (HostelID) REFERENCES HOSTEL(HostelID),
  CONSTRAINT chk_room_capacity CHECK (Capacity BETWEEN 1 AND 6),
  CONSTRAINT chk_room_status   CHECK (Status IN ('Available','Occupied')),
  CONSTRAINT chk_room_rent     CHECK (Monthly_Rent > 0)
);

-- ── 3. STAFF ─────────────────────────────────────────────────
CREATE TABLE STAFF (
  StaffID    INT PRIMARY KEY,
  First_Name VARCHAR(50),
  Last_Name  VARCHAR(50),
  Role       VARCHAR(50),
  Email      VARCHAR(100) UNIQUE,
  Contact    VARCHAR(15),
  Salary     DECIMAL(10,2),
  Hire_Date  DATE
);

-- ── 4. STUDENT ───────────────────────────────────────────────
CREATE TABLE STUDENT (
  StudentID   INT PRIMARY KEY,
  First_Name  VARCHAR(50) NOT NULL,
  Last_Name   VARCHAR(50) NOT NULL,
  Email       VARCHAR(100) NOT NULL UNIQUE,
  Phone       VARCHAR(15),
  Date_of_Birth DATE,
  Course      VARCHAR(50),
  Department  VARCHAR(50),
  Year        INT,
  RoomID      INT,
  FOREIGN KEY (RoomID) REFERENCES ROOM(RoomID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- ── 5. BED (Weak Entity) ──────────────────────────────────────
CREATE TABLE BED (
  RoomID     INT,
  Bed_Number INT,
  Bed_Type   VARCHAR(50),
  Status     VARCHAR(20) DEFAULT 'Available',
  PRIMARY KEY (RoomID, Bed_Number),
  FOREIGN KEY (RoomID) REFERENCES ROOM(RoomID)
);

-- ── 6. COMPLAINT ──────────────────────────────────────────────
CREATE TABLE COMPLAINT (
  ComplaintID     INT PRIMARY KEY,
  StudentID       INT,
  RoomID          INT,
  Category        VARCHAR(50),
  Description     TEXT,
  DateFiled       DATE,
  Priority        VARCHAR(20) DEFAULT 'Medium',
  Status          VARCHAR(20) DEFAULT 'Open',
  Resolution_Date DATE,
  AssignedStaffID INT,
  FOREIGN KEY (StudentID)       REFERENCES STUDENT(StudentID),
  FOREIGN KEY (RoomID)          REFERENCES ROOM(RoomID),
  FOREIGN KEY (AssignedStaffID) REFERENCES STAFF(StaffID)
);

-- ── 7. PAYMENT ────────────────────────────────────────────────
CREATE TABLE PAYMENT (
  PaymentID      INT PRIMARY KEY,
  StudentID      INT,
  Amount         DECIMAL(10,2) NOT NULL,
  PaymentDate    DATE,
  PaymentType    VARCHAR(50),
  Status         VARCHAR(20) DEFAULT 'Pending',
  Transaction_ID VARCHAR(100),
  FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID),
  CONSTRAINT chk_payment_type CHECK (PaymentType IN ('Cash','Online','Card','UPI'))
);

-- ── 8. RESOURCE_USAGE ─────────────────────────────────────────
CREATE TABLE RESOURCE_USAGE (
  UsageID          INT PRIMARY KEY,
  RoomID           INT,
  ElectricityUnits DECIMAL(10,2),
  WaterUnits       DECIMAL(10,2),
  Internet_Usage   DECIMAL(10,2),
  RecordedDate     DATE,
  FOREIGN KEY (RoomID) REFERENCES ROOM(RoomID)
);

-- ── 9. HOSTEL_FEE ─────────────────────────────────────────────
CREATE TABLE HOSTEL_FEE (
  FeeID    INT PRIMARY KEY,
  Fee_Type VARCHAR(50),
  Amount   DECIMAL(10,2),
  Due_Date DATE,
  Fine     DECIMAL(10,2)
);

-- ── 10. VISITOR ───────────────────────────────────────────────
CREATE TABLE VISITOR (
  VisitorID          INT PRIMARY KEY,
  Name               VARCHAR(100),
  Contact            VARCHAR(15),
  Visit_Date         DATE,
  Relation_to_Student VARCHAR(50)
);

-- ── 11. VISITOR_LOG (Weak Entity) ────────────────────────────
CREATE TABLE VISITOR_LOG (
  Log_ID     INT PRIMARY KEY,
  VisitorID  INT,
  StudentID  INT,
  Entry_Time DATETIME,
  Exit_Time  DATETIME,
  FOREIGN KEY (VisitorID) REFERENCES VISITOR(VisitorID),
  FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID)
);

-- ============================================================
-- INSERT DATA
-- ============================================================

INSERT INTO HOSTEL VALUES
(1,'Ganga Hostel','A','Main St','Chennai','TN','600001'),
(2,'Yamuna Hostel','B','Lake Rd','Chennai','TN','600002'),
(3,'Kaveri Hostel','C','Park Ave','Chennai','TN','600003'),
(4,'Krishna Hostel','D','Temple Rd','Chennai','TN','600004'),
(5,'Godavari Hostel','E','River St','Chennai','TN','600005');

INSERT INTO ROOM VALUES
(201,'A101',1,4,'Standard','Occupied',5000.00,1),
(202,'A102',1,4,'Standard','Available',5000.00,1),
(203,'B201',2,3,'Deluxe','Occupied',7000.00,2),
(204,'C301',3,2,'Single','Available',8000.00,3),
(205,'D401',4,4,'Standard','Occupied',5000.00,4);

INSERT INTO STAFF VALUES
(301,'Rajesh','Kumar','Electrician','rajesh@hostel.com','9988776655',25000.00,'2023-06-01'),
(302,'Suresh','Singh','Plumber','suresh@hostel.com','8877665544',22000.00,'2023-07-10'),
(303,'Meena','Das','Warden','meena@hostel.com','7766554433',40000.00,'2022-01-15'),
(304,'Ravi','Patel','Cleaner','ravi@hostel.com','6655443322',15000.00,'2023-03-20'),
(305,'Kiran','Shah','Security','kiran@hostel.com','5544332211',18000.00,'2023-05-05');

INSERT INTO STUDENT VALUES
(1,'Ananya','Sharma','ananya@gmail.com','9876543210','2003-05-10','CSE','Engineering',2,201),
(2,'Rohan','Verma','rohan@gmail.com','9123456780','2002-08-15','ECE','Engineering',3,201),
(3,'Priya','Nair','priya@gmail.com','9988776655','2003-01-20','IT','Engineering',2,202),
(4,'Arjun','Reddy','arjun@gmail.com','8877665544','2001-12-11','ME','Engineering',4,203),
(5,'Sneha','Iyer','sneha@gmail.com','7766554433','2002-06-25','CSE','Engineering',3,205);

INSERT INTO BED VALUES
(201,1,'Single','Occupied'),
(201,2,'Single','Available'),
(202,1,'Single','Available'),
(203,1,'Double','Occupied'),
(205,1,'Single','Occupied');

INSERT INTO COMPLAINT VALUES
(401,1,201,'Electricity','Fan not working','2025-02-01','High','Open',NULL,301),
(402,2,201,'Water','Leakage issue','2025-02-02','Medium','Open',NULL,302),
(403,3,202,'Cleaning','Room not cleaned','2025-02-03','Low','Closed','2025-02-05',304),
(404,4,203,'Internet','WiFi not working','2025-02-04','High','Open',NULL,305),
(405,5,205,'Electricity','Light flickering','2025-02-05','Medium','Open',NULL,301);

INSERT INTO PAYMENT VALUES
(501,1,45000.00,'2025-01-15','Online','Paid','TXN1001'),
(502,2,45000.00,'2025-01-16','Card','Paid','TXN1002'),
(503,3,45000.00,'2025-01-17','Cash','Pending','TXN1003'),
(504,4,50000.00,'2025-01-18','Online','Paid','TXN1004'),
(505,5,45000.00,'2025-01-19','UPI','Paid','TXN1005');

INSERT INTO RESOURCE_USAGE VALUES
(601,201,120.50,300.75,50.25,'2025-02-01'),
(602,202,100.00,250.00,40.00,'2025-02-02'),
(603,203,140.75,320.50,60.10,'2025-02-03'),
(604,204,90.25,200.40,30.50,'2025-02-04'),
(605,205,130.60,310.80,55.00,'2025-02-05');

INSERT INTO HOSTEL_FEE VALUES
(701,'Semester Fee',45000.00,'2025-01-10',500.00),
(702,'Mess Fee',15000.00,'2025-01-12',200.00),
(703,'Maintenance Fee',5000.00,'2025-01-15',100.00),
(704,'Electricity Fee',3000.00,'2025-01-18',50.00),
(705,'Water Fee',2000.00,'2025-01-20',50.00);

INSERT INTO VISITOR VALUES
(801,'Priya Sharma','9998887776','2025-02-05','Mother'),
(802,'Amit Verma','8887776665','2025-02-06','Father'),
(803,'Neha Nair','7776665554','2025-02-07','Sister'),
(804,'Rahul Reddy','6665554443','2025-02-08','Friend'),
(805,'Lakshmi Iyer','5554443332','2025-02-09','Mother');

INSERT INTO VISITOR_LOG VALUES
(901,801,1,'2025-02-05 10:00:00','2025-02-05 12:00:00'),
(902,802,2,'2025-02-06 11:00:00','2025-02-06 13:00:00'),
(903,803,3,'2025-02-07 09:30:00','2025-02-07 11:00:00'),
(904,804,4,'2025-02-08 14:00:00','2025-02-08 16:00:00'),
(905,805,5,'2025-02-09 15:00:00','2025-02-09 17:00:00');

-- ============================================================
-- VIEWS
-- ============================================================
CREATE OR REPLACE VIEW Hostel_Occupancy AS
SELECT h.HostelName, COUNT(r.RoomID) AS Total_Rooms,
       SUM(CASE WHEN r.Status='Occupied' THEN 1 ELSE 0 END) AS Occupied
FROM HOSTEL h JOIN ROOM r ON h.HostelID=r.HostelID GROUP BY h.HostelName;

CREATE OR REPLACE VIEW Pending_Payments AS
SELECT CONCAT(s.First_Name,' ',s.Last_Name) AS StudentName, p.Amount, p.PaymentDate, p.PaymentType
FROM STUDENT s JOIN PAYMENT p ON s.StudentID=p.StudentID WHERE p.Status='Pending';

CREATE OR REPLACE VIEW Active_Complaints AS
SELECT c.ComplaintID, CONCAT(s.First_Name,' ',s.Last_Name) AS StudentName,
       r.RoomNumber, c.Category, c.Priority, c.Status, c.DateFiled
FROM COMPLAINT c
LEFT JOIN STUDENT s ON c.StudentID=s.StudentID
LEFT JOIN ROOM r ON c.RoomID=r.RoomID
WHERE c.Status='Open';

-- ============================================================
-- TRIGGERS
-- ============================================================
DELIMITER $$

-- Prevent invalid payment amount
DROP TRIGGER IF EXISTS trg_check_payment$$
CREATE TRIGGER trg_check_payment
BEFORE INSERT ON PAYMENT FOR EACH ROW
BEGIN
  IF NEW.Amount <= 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid Payment: Amount must be > 0';
  END IF;
END$$

-- Auto-update room status on student room change
DROP TRIGGER IF EXISTS trg_room_update$$
CREATE TRIGGER trg_room_update
AFTER UPDATE ON STUDENT FOR EACH ROW
BEGIN
  IF NEW.RoomID IS NOT NULL THEN
    UPDATE ROOM SET Status='Occupied' WHERE RoomID=NEW.RoomID;
  END IF;
  IF OLD.RoomID IS NOT NULL AND OLD.RoomID != NEW.RoomID THEN
    UPDATE ROOM SET Status='Available' WHERE RoomID=OLD.RoomID
      AND NOT EXISTS (SELECT 1 FROM STUDENT WHERE RoomID=OLD.RoomID);
  END IF;
END$$

DELIMITER ;

SELECT 'Database setup complete! All 11 tables created and loaded.' AS Status;
