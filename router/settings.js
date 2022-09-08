const express=require("express")
const passport=require('passport')
const rateLimit = require('express-rate-limit')
const Cookie = require('cookie');
const goalExpentancy = require("../controllers/goalExpentancy");
const router=express.Router();






/*
 ----------------------------
            ODDS
 -----------------------------
 */




 
router.post('/changeGoalExpectancy',goalExpentancy)

router.post('/changeOdd',(req, res)=>{
     
})




/*
 ----------------------------
            USERS
 -----------------------------
 */

router.post('/deleteStaff',(req, res)=>{
     
})

router.post('/deleteAdmin',(req, res)=>{
     
})

router.post('/deleteSuper',(req, res)=>{
     
})


module.exports=router;