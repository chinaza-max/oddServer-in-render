const express=require("express")
const passport=require('passport')
const rateLimit = require('express-rate-limit')
const Cookie = require('cookie');
const changeGoalExpectancy = require("../controllers/changeGoalExpectancy");
const changeOdd = require("../controllers/changeOdd");
const deleteSuperAdmin = require("../controllers/deleteSuperAdmin");
const deleteAdmin = require("../controllers/deleteAdmin");
const deleteStaff = require("../controllers/deleteStaff");
const verifyJWTAdmin = require("../controllers/adminDeserializeJWT")

const router=express.Router();






/*
 ----------------------------
            ODDS
 -----------------------------
 */

router.put('/changeGoalExpectancy/:id',verifyJWTAdmin,changeGoalExpectancy,(req, res)=>{})

router.put('/changeOdd/:id',verifyJWTAdmin,changeOdd,(req, res)=>{})





/*
 ----------------------------
            USERS
 -----------------------------
 */

router.delete('/deleteStaff/:id',verifyJWTAdmin,deleteStaff,(req, res)=>{})

router.delete('/deleteAdmin/:id',verifyJWTAdmin,deleteAdmin,(req, res)=>{})

router.delete('/deleteSuperAdmin/:id',verifyJWTAdmin,deleteSuperAdmin,(req, res)=>{})

module.exports=router;