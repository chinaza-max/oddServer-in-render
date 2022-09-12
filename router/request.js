const express=require("express")
const passport=require('passport')
const rateLimit = require('express-rate-limit')
const Cookie = require('cookie');
const leagueTable = require("../controllers/table");
const router=express.Router();
const getOdds=require("../controllers/getOdds")






router.get('/fixture',(req, res)=>{
     
})

router.get('/getOdds',getOdds,(req, res)=>{
     
})
router.get('/getTable/:id',leagueTable)





module.exports=router;