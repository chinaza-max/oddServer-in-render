const express=require("express")
const passport=require('passport')
const rateLimit = require('express-rate-limit')
const Cookie = require('cookie');
const changeGoalExpectancy = require("../controllers/changeGoalExpectancy");
const changeOdd = require("../controllers/changeOdd");
const deleteSuperAdmin = require("../controllers/deleteSuperAdmin");
const deleteAdmin = require("../controllers/deleteAdmin");
const deleteStaff = require("../controllers/deleteStaff");

const router=express.Router();






/*
 ----------------------------
            ODDS
 -----------------------------
 */

router.post('/changeGoalExpectancy',changeGoalExpectancy,(req, res)=>{
    
})
router.post('/changeOdd',changeOdd,(req, res)=>{})




/*
 ----------------------------
            USERS
 -----------------------------
 */

router.post('/deleteStaff',deleteStaff,(req, res)=>{})

router.post('/deleteAdmin',deleteAdmin,(req, res)=>{})

router.post('/deleteSuperAdmin',deleteSuperAdmin,(req, res)=>{})


module.exports=router;