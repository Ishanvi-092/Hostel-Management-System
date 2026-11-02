const router = require('express').Router();
const db = require('../config/db');
router.get('/', async (req, res) => {
  try {
    const { search, department, year } = req.query;
    let sql = `SELECT s.*, r.RoomNumber, h.HostelName FROM STUDENT s LEFT JOIN ROOM r ON s.RoomID=r.RoomID LEFT JOIN HOSTEL h ON r.HostelID=h.HostelID WHERE 1=1`;
    const p = [];
    if (search) { sql += ` AND (s.First_Name LIKE ? OR s.Last_Name LIKE ? OR s.Email LIKE ?)`; p.push(`%${search}%`,`%${search}%`,`%${search}%`); }
    if (department) { sql += ` AND s.Department=?`; p.push(department); }
    if (year)       { sql += ` AND s.Year=?`;       p.push(year); }
    sql += ` ORDER BY s.StudentID`;
    const [rows] = await db.query(sql, p);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT s.*, r.RoomNumber, r.Room_Type, r.Floor, r.Capacity, r.Monthly_Rent, r.Status as RoomStatus, h.HostelName, h.Block FROM STUDENT s LEFT JOIN ROOM r ON s.RoomID=r.RoomID LEFT JOIN HOSTEL h ON r.HostelID=h.HostelID WHERE s.StudentID=?`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
router.post('/', async (req, res) => {
  try {
    const { StudentID, First_Name, Last_Name, Email, Phone, Date_of_Birth, Course, Department, Year, RoomID } = req.body;
    if (!First_Name || !Last_Name || !Email) return res.status(400).json({ success: false, error: 'First_Name, Last_Name, Email required' });
    const [result] = await db.query(`INSERT INTO STUDENT (StudentID,First_Name,Last_Name,Email,Phone,Date_of_Birth,Course,Department,Year,RoomID) VALUES (?,?,?,?,?,?,?,?,?,?)`, [StudentID||null,First_Name,Last_Name,Email,Phone,Date_of_Birth,Course,Department,Year,RoomID||null]);
    res.status(201).json({ success: true, StudentID: result.insertId });
  } catch (err) {
    if (err.code==='ER_DUP_ENTRY') return res.status(409).json({ success: false, error: 'Email already exists' });
    res.status(500).json({ success: false, error: err.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const fields = ['First_Name','Last_Name','Email','Phone','Date_of_Birth','Course','Department','Year','RoomID'];
    const updates=[]; const p=[];
    fields.forEach(f => { if(req.body[f]!==undefined){ updates.push(`${f}=?`); p.push(req.body[f]); }});
    if (!updates.length) return res.status(400).json({ success: false, error: 'Nothing to update' });
    p.push(req.params.id);
    await db.query(`UPDATE STUDENT SET ${updates.join(',')} WHERE StudentID=?`, p);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
router.delete('/:id', async (req, res) => {
  try { await db.query('DELETE FROM STUDENT WHERE StudentID=?', [req.params.id]); res.json({ success: true }); }
  catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
module.exports = router;
