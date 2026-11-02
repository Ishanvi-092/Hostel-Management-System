const router = require('express').Router();
const db = require('../config/db');
router.get('/', async (req, res) => {
  try{
    const{room_id}=req.query;
    let sql=`SELECT u.*, r.RoomNumber FROM RESOURCE_USAGE u LEFT JOIN ROOM r ON u.RoomID=r.RoomID WHERE 1=1`;
    const p=[];
    if(room_id){sql+=` AND u.RoomID=?`;p.push(room_id);}
    sql+=` ORDER BY u.RecordedDate DESC`;
    const[rows]=await db.query(sql,p);
    res.json({success:true,data:rows});
  }catch(err){res.status(500).json({success:false,error:err.message});}
});
router.post('/', async (req, res) => {
  try{
    const{RoomID,ElectricityUnits,WaterUnits,Internet_Usage,RecordedDate}=req.body;
    const[r]=await db.query(`INSERT INTO RESOURCE_USAGE (RoomID,ElectricityUnits,WaterUnits,Internet_Usage,RecordedDate) VALUES (?,?,?,?,?)`,[RoomID,ElectricityUnits||0,WaterUnits||0,Internet_Usage||0,RecordedDate||new Date().toISOString().split('T')[0]]);
    res.status(201).json({success:true,UsageID:r.insertId});
  }catch(err){res.status(500).json({success:false,error:err.message});}
});
module.exports = router;
