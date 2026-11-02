const router = require('express').Router();
const db = require('../config/db');
router.get('/', async (req, res) => {
  try {
    const [rows]=await db.query(`SELECT s.*, COUNT(c.ComplaintID) AS Assigned_Complaints FROM STAFF s LEFT JOIN COMPLAINT c ON s.StaffID=c.AssignedStaffID GROUP BY s.StaffID ORDER BY s.StaffID`);
    res.json({success:true,data:rows});
  }catch(err){res.status(500).json({success:false,error:err.message});}
});
router.get('/:id', async (req, res) => {
  try{
    const[rows]=await db.query('SELECT * FROM STAFF WHERE StaffID=?',[req.params.id]);
    if(!rows.length)return res.status(404).json({success:false,error:'Not found'});
    res.json({success:true,data:rows[0]});
  }catch(err){res.status(500).json({success:false,error:err.message});}
});
router.get('/:id/complaints', async (req, res) => {
  try{
    const[rows]=await db.query(`SELECT c.*, CONCAT(s.First_Name,' ',s.Last_Name) AS StudentName, r.RoomNumber FROM COMPLAINT c LEFT JOIN STUDENT s ON c.StudentID=s.StudentID LEFT JOIN ROOM r ON c.RoomID=r.RoomID WHERE c.AssignedStaffID=? ORDER BY c.DateFiled DESC`,[req.params.id]);
    res.json({success:true,data:rows});
  }catch(err){res.status(500).json({success:false,error:err.message});}
});
router.post('/', async (req, res) => {
  try{
    const{First_Name,Last_Name,Role,Email,Contact,Salary,Hire_Date}=req.body;
    const[r]=await db.query(`INSERT INTO STAFF (First_Name,Last_Name,Role,Email,Contact,Salary,Hire_Date) VALUES (?,?,?,?,?,?,?)`,[First_Name,Last_Name,Role,Email,Contact,Salary,Hire_Date||null]);
    res.status(201).json({success:true,StaffID:r.insertId});
  }catch(err){res.status(500).json({success:false,error:err.message});}
});
router.put('/:id', async (req, res) => {
  try{
    const fields=['First_Name','Last_Name','Role','Email','Contact','Salary','Hire_Date'];const updates=[];const p=[];
    fields.forEach(f=>{if(req.body[f]!==undefined){updates.push(`${f}=?`);p.push(req.body[f]);}});
    p.push(req.params.id);
    await db.query(`UPDATE STAFF SET ${updates.join(',')} WHERE StaffID=?`,p);
    res.json({success:true});
  }catch(err){res.status(500).json({success:false,error:err.message});}
});
router.delete('/:id', async (req, res) => {
  try{await db.query('DELETE FROM STAFF WHERE StaffID=?',[req.params.id]);res.json({success:true});}
  catch(err){res.status(500).json({success:false,error:err.message});}
});
module.exports = router;
