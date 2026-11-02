const router = require('express').Router();
const db = require('../config/db');
router.get('/', async (req, res) => {
  try {
    const { status, student_id } = req.query;
    let sql = `SELECT p.*, CONCAT(s.First_Name,' ',s.Last_Name) AS StudentName FROM PAYMENT p LEFT JOIN STUDENT s ON p.StudentID=s.StudentID WHERE 1=1`;
    const params = [];
    if (status)     { sql+=` AND p.Status=?`;    params.push(status); }
    if (student_id) { sql+=` AND p.StudentID=?`; params.push(student_id); }
    sql += ` ORDER BY p.PaymentDate DESC`;
    const [rows] = await db.query(sql, params);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
router.post('/', async (req, res) => {
  try {
    const { StudentID, Amount, PaymentDate, PaymentType, Status, Transaction_ID } = req.body;
    if (!StudentID||!Amount||!PaymentType) return res.status(400).json({ success: false, error: 'StudentID, Amount, PaymentType required' });
    if (parseFloat(Amount)<=0) return res.status(400).json({ success: false, error: 'Amount must be > 0' });
    const txnId = Transaction_ID || 'TXN' + Date.now();
    const [result] = await db.query(`INSERT INTO PAYMENT (StudentID,Amount,PaymentDate,PaymentType,Status,Transaction_ID) VALUES (?,?,?,?,?,?)`,
      [StudentID,Amount,PaymentDate||new Date().toISOString().split('T')[0],PaymentType,Status||'Pending',txnId]);
    res.status(201).json({ success: true, PaymentID: result.insertId, Transaction_ID: txnId });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
router.put('/:id', async (req, res) => {
  try {
    const { Status } = req.body;
    await db.query('UPDATE PAYMENT SET Status=? WHERE PaymentID=?',[Status,req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
module.exports = router;
