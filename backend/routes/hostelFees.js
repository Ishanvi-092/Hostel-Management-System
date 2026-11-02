const router = require('express').Router();
const db = require('../config/db');
router.get('/', async (req, res) => {
  try{const[rows]=await db.query('SELECT * FROM HOSTEL_FEE ORDER BY Due_Date');res.json({success:true,data:rows});}
  catch(err){res.status(500).json({success:false,error:err.message});}
});
router.post('/', async (req, res) => {
  try{
    const{Fee_Type,Amount,Due_Date,Fine}=req.body;
    const[r]=await db.query('INSERT INTO HOSTEL_FEE (Fee_Type,Amount,Due_Date,Fine) VALUES (?,?,?,?)',[Fee_Type,Amount,Due_Date,Fine||0]);
    res.status(201).json({success:true,FeeID:r.insertId});
  }catch(err){res.status(500).json({success:false,error:err.message});}
});
router.put('/:id', async (req, res) => {
  try{
    const{Fee_Type,Amount,Due_Date,Fine}=req.body;
    await db.query(`UPDATE HOSTEL_FEE SET Fee_Type=COALESCE(?,Fee_Type),Amount=COALESCE(?,Amount),Due_Date=COALESCE(?,Due_Date),Fine=COALESCE(?,Fine) WHERE FeeID=?`,[Fee_Type||null,Amount||null,Due_Date||null,Fine||null,req.params.id]);
    res.json({success:true});
  }catch(err){res.status(500).json({success:false,error:err.message});}
});
module.exports = router;
