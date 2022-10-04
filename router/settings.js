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

router.put('/changeGoalExpectancy/:id',changeGoalExpectancy,(req, res)=>{
    
})
router.post('/changeOdd',changeOdd,(req, res)=>{})




/*
 ----------------------------
            USERS
 -----------------------------
 */

router.delete('/deleteStaff/:id',deleteStaff,(req, res)=>{})

router.delete('/deleteAdmin/:id',deleteAdmin,(req, res)=>{})

router.delete('/deleteSuperAdmin/:id',deleteSuperAdmin,(req, res)=>{})

module.exports=router;