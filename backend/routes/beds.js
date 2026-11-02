const router = require('express').Router();
const db = require('../config/db');
router.get('/', async (req, res) => {
  try {
    const { room_id } = req.query;
    let sql=`SELECT b.*, r.RoomNumber FROM BED b LEFT JOIN ROOM r ON b.RoomID=r.RoomID WHERE 1=1`;
    const p=[];
    if (room_id){sql+=` AND b.RoomID=?`;p.push(room_id);}
    const [rows]=await db.query(sql,p);
    res.json({success:true,data:rows});
  }catch(err){res.status(500).json({success:false,error:err.message});}
});
router.post('/', async (req, res) => {
  try{
    const{RoomID,Bed_Number,Bed_Type,Status}=req.body;
    await db.query('INSERT INTO BED (RoomID,Bed_Number,Bed_Type,Status) VALUES (?,?,?,?)',[RoomID,Bed_Number,Bed_Type,Status||'Available']);
    res.status(201).json({success:true});
  }catch(err){res.status(500).json({success:false,error:err.message});}
});
router.put('/:room_id/:bed_number', async (req, res) => {
  try{
    await db.query('UPDATE BED SET Status=? WHERE RoomID=? AND Bed_Number=?',[req.body.Status,req.params.room_id,req.params.bed_number]);
    res.json({success:true});
  }catch(err){res.status(500).json({success:false,error:err.message});}
});
module.exports = router;
