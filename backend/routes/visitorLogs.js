const router = require('express').Router();
const db = require('../config/db');
router.get('/', async (req, res) => {
  try{
    const{student_id}=req.query;
    let sql=`SELECT vl.*, v.Name AS VisitorName, v.Contact, v.Relation_to_Student, CONCAT(s.First_Name,' ',s.Last_Name) AS StudentName FROM VISITOR_LOG vl LEFT JOIN VISITOR v ON vl.VisitorID=v.VisitorID LEFT JOIN STUDENT s ON vl.StudentID=s.StudentID WHERE 1=1`;
    const p=[];
    if(student_id){sql+=` AND vl.StudentID=?`;p.push(student_id);}
    sql+=` ORDER BY vl.Entry_Time DESC`;
    const[rows]=await db.query(sql,p);
    res.json({success:true,data:rows});
  }catch(err){res.status(500).json({success:false,error:err.message});}
});
router.post('/', async (req, res) => {
  try{
    const{VisitorID,StudentID,Entry_Time,Exit_Time}=req.body;
    const[r]=await db.query('INSERT INTO VISITOR_LOG (VisitorID,StudentID,Entry_Time,Exit_Time) VALUES (?,?,?,?)',[VisitorID,StudentID,Entry_Time||new Date(),Exit_Time||null]);
    res.status(201).json({success:true,Log_ID:r.insertId});
  }catch(err){res.status(500).json({success:false,error:err.message});}
});
router.put('/:id', async (req, res) => {
  try{
    await db.query('UPDATE VISITOR_LOG SET Exit_Time=? WHERE Log_ID=?',[req.body.Exit_Time,req.params.id]);
    res.json({success:true});
  }catch(err){res.status(500).json({success:false,error:err.message});}
});
module.exports = router;
