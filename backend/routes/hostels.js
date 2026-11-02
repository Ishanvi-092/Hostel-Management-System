const router = require('express').Router();
const db = require('../config/db');
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT h.*, COUNT(r.RoomID) AS Total_Rooms, SUM(CASE WHEN r.Status='Occupied' THEN 1 ELSE 0 END) AS Occupied_Rooms FROM HOSTEL h LEFT JOIN ROOM r ON h.HostelID=r.HostelID GROUP BY h.HostelID ORDER BY h.HostelID`);
    res.json({ success: true, data: rows });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM HOSTEL WHERE HostelID=?',[req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
router.post('/', async (req, res) => {
  try {
    const { HostelName, Block, Street, City, State, Zip } = req.body;
    const [r] = await db.query('INSERT INTO HOSTEL (HostelName,Block,Street,City,State,Zip) VALUES (?,?,?,?,?,?)',[HostelName,Block,Street,City,State,Zip]);
    res.status(201).json({ success: true, HostelID: r.insertId });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
module.exports = router;
