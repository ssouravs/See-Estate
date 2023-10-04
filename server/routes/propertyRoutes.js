const verifyToken=require('../middlewares/verifyToken')
const addProperty=require('../controllers/addProperty');
const updateProperty=require('../controllers/updateProperty')
const deleteProperty=require('../controllers/deleteProperty');
const getMyProperties=require('../controllers/getMyProperties');
const getAllProperties=require('../controllers/getAllProperties');
const express=require("express");
const router=express.Router();
const bodyParser=require('body-parser')
router.use(bodyParser.json()); 


//post method to add property by authorised owners
router.post('/property',verifyToken,addProperty);

//put method to update property by authorised owners
router.put('/property/:id',verifyToken,updateProperty);

//delete method to delete [roperty by authorised owners
router.delete('/property/:id',verifyToken,deleteProperty)

//get method to fetch all the properties owned by authorised owner
router.get('/property',verifyToken,getMyProperties)

//get method to fetch all the properties int the entire database
router.get('/list-properties',getAllProperties);


module.exports=router;