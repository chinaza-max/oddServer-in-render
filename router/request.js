const express=require("express")
const rateLimit = require('express-rate-limit')
const leagueTable = require("../controllers/table");
const router=express.Router();
const getOdds=require("../controllers/getOdds")
const getSuperAdmin=require("../controllers/getSuperAdmin")
const  verifyJWT = require("../controllers/deserializeJWT")



router.get('/fixture',verifyJWT,(req, res)=>{})
router.get('/getOdds/:id',verifyJWT,getOdds,(req, res)=>{})
router.get('/getTable/:id',verifyJWT,leagueTable)
router.get('/getSuperAdmin',verifyJWT,getSuperAdmin,(req, res)=>{})

module.exports=router;