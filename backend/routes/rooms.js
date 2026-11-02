const router = require('express').Router();
const db = require('../config/db');
router.get('/', async (req, res) => {
  try {
    const { status, hostel_id } = req.query;
    let sql = `SELECT r.*, h.HostelName FROM ROOM r LEFT JOIN HOSTEL h ON r.HostelID=h.HostelID WHERE 1=1`;
    const p = [];
    if (status)    { sql+=` AND r.Status=?`;   p.push(status); }
    if (hostel_id) { sql+=` AND r.HostelID=?`; p.push(hostel_id); }
    sql+=` ORDER BY r.RoomID`;
    const [rows] = await db.query(sql, p);
    res.json({ success: true, data: rows });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT r.*, h.HostelName FROM ROOM r LEFT JOIN HOSTEL h ON r.HostelID=h.HostelID WHERE r.RoomID=?`,[req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
router.post('/', async (req, res) => {
  try {
    const { RoomNumber, Floor, Capacity, Room_Type, Status, Monthly_Rent, HostelID } = req.body;
    const [r] = await db.query(`INSERT INTO ROOM (RoomNumber,Floor,Capacity,Room_Type,Status,Monthly_Rent,HostelID) VALUES (?,?,?,?,?,?,?)`,[RoomNumber,Floor,Capacity,Room_Type,Status||'Available',Monthly_Rent,HostelID||null]);
    res.status(201).json({ success: true, RoomID: r.insertId });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
router.put('/:id', async (req, res) => {
  try {
    const fields=['RoomNumber','Floor','Capacity','Room_Type','Status','Monthly_Rent','HostelID']; const updates=[]; const p=[];
    fields.forEach(f=>{if(req.body[f]!==undefined){updates.push(`${f}=?`);p.push(req.body[f]);}});
    p.push(req.params.id);
    await db.query(`UPDATE ROOM SET ${updates.join(',')} WHERE RoomID=?`,p);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
module.exports = router;
