const express=require("express")
const passport=require('passport')
const rateLimit = require('express-rate-limit')
const Cookie = require('cookie');
const changeGoalExpectancy = require("../controllers/changeGoalExpectancy");
const changeOdd = require("../controllers/changeOdd");
const router=express.Router();






/*
 ----------------------------
            ODDS
 -----------------------------
 */

router.post('/changeGoalExpectancy',changeGoalExpectancy,(req, res)=>{
    
})
router.post('/changeOdd',changeOdd,(req, res)=>{
     
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