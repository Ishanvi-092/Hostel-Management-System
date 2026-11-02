const router = require('express').Router();
const db = require('../config/db');
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !role) return res.status(400).json({ success: false, error: 'Email and role required' });
    let userData = null;
    if (role === 'student') {
      const [rows] = await db.query(`SELECT s.*, r.RoomNumber, r.Room_Type, h.HostelName FROM STUDENT s LEFT JOIN ROOM r ON s.RoomID=r.RoomID LEFT JOIN HOSTEL h ON r.HostelID=h.HostelID WHERE s.Email=?`, [email]);
      if (!rows.length) return res.status(401).json({ success: false, error: 'Student not found. Check email.' });
      userData = { ...rows[0], role: 'student' };
    } else if (role === 'staff') {
      const [rows] = await db.query('SELECT * FROM STAFF WHERE Email=?', [email]);
      if (!rows.length) return res.status(401).json({ success: false, error: 'Staff not found. Check email.' });
      userData = { ...rows[0], role: 'staff' };
    } else if (role === 'admin') {
      userData = { AdminID: 1, name: 'Admin', email, role: 'admin' };
    }
    res.json({ success: true, user: userData });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
module.exports = router;
