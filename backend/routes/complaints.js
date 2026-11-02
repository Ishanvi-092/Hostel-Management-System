const router = require('express').Router();
const db = require('../config/db');
router.get('/', async (req, res) => {
  try {
    const { status, priority, student_id, staff_id } = req.query;
    let sql = `SELECT c.*, CONCAT(s.First_Name,' ',s.Last_Name) AS StudentName, r.RoomNumber, CONCAT(st.First_Name,' ',st.Last_Name) AS StaffName FROM COMPLAINT c LEFT JOIN STUDENT s ON c.StudentID=s.StudentID LEFT JOIN ROOM r ON c.RoomID=r.RoomID LEFT JOIN STAFF st ON c.AssignedStaffID=st.StaffID WHERE 1=1`;
    const p = [];
    if (status)     { sql+=` AND c.Status=?`;          p.push(status); }
    if (priority)   { sql+=` AND c.Priority=?`;        p.push(priority); }
    if (student_id) { sql+=` AND c.StudentID=?`;       p.push(student_id); }
    if (staff_id)   { sql+=` AND c.AssignedStaffID=?`; p.push(staff_id); }
    sql += ` ORDER BY c.DateFiled DESC`;
    const [rows] = await db.query(sql, p);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT c.*, CONCAT(s.First_Name,' ',s.Last_Name) AS StudentName, r.RoomNumber FROM COMPLAINT c LEFT JOIN STUDENT s ON c.StudentID=s.StudentID LEFT JOIN ROOM r ON c.RoomID=r.RoomID WHERE c.ComplaintID=?`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
router.post('/', async (req, res) => {
  try {
    const { StudentID, RoomID, Category, Description, DateFiled, Priority, Status, AssignedStaffID } = req.body;
    if (!StudentID||!RoomID||!Category||!Description) return res.status(400).json({ success: false, error: 'StudentID, RoomID, Category, Description required' });
    const [result] = await db.query(`INSERT INTO COMPLAINT (StudentID,RoomID,Category,Description,DateFiled,Priority,Status,AssignedStaffID) VALUES (?,?,?,?,?,?,?,?)`,
      [StudentID,RoomID,Category,Description,DateFiled||new Date().toISOString().split('T')[0],Priority||'Medium',Status||'Open',AssignedStaffID||null]);
    res.status(201).json({ success: true, ComplaintID: result.insertId });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
router.put('/:id', async (req, res) => {
  try {
    const fields = ['Status','AssignedStaffID','Resolution_Date','Priority','Category','Description'];
    const updates=[]; const p=[];
    fields.forEach(f => { if(req.body[f]!==undefined){ updates.push(`${f}=?`); p.push(req.body[f]); }});
    if (!updates.length) return res.status(400).json({ success: false, error: 'Nothing to update' });
    p.push(req.params.id);
    await db.query(`UPDATE COMPLAINT SET ${updates.join(',')} WHERE ComplaintID=?`, p);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
router.delete('/:id', async (req, res) => {
  try { await db.query('DELETE FROM COMPLAINT WHERE ComplaintID=?',[req.params.id]); res.json({ success: true }); }
  catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
module.exports = router;
