const express=require("express")
const passport=require('passport')
const rateLimit = require('express-rate-limit')
const Cookie = require('cookie');
const leagueTable = require("../controllers/table");
const router=express.Router();
const getOdds=require("../controllers/getOdds")
const getSuperAdmin=require("../controllers/getSuperAdmin")

router.get('/fixture',(req, res)=>{})
router.get('/getOdds/:id',getOdds,(req, res)=>{})
router.get('/getTable/:id',leagueTable)
router.get('/getSuperAdmin',getSuperAdmin,(req, res)=>{})

module.exports=router;