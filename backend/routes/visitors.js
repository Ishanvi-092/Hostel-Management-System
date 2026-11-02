const router = require('express').Router();
const db = require('../config/db');
router.get('/', async (req, res) => {
  try{const[rows]=await db.query('SELECT * FROM VISITOR ORDER BY Visit_Date DESC');res.json({success:true,data:rows});}
  catch(err){res.status(500).json({success:false,error:err.message});}
});
router.post('/', async (req, res) => {
  try{
    const{Name,Contact,Visit_Date,Relation_to_Student}=req.body;
    const[r]=await db.query('INSERT INTO VISITOR (Name,Contact,Visit_Date,Relation_to_Student) VALUES (?,?,?,?)',[Name,Contact,Visit_Date||new Date().toISOString().split('T')[0],Relation_to_Student]);
    res.status(201).json({success:true,VisitorID:r.insertId});
  }catch(err){res.status(500).json({success:false,error:err.message});}
});
module.exports = router;
