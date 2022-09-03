const express=require("express")
const passport=require('passport')
const rateLimit = require('express-rate-limit')
const Cookie = require('cookie')
const router=express.Router();
const getOdds=require("../controllers/getOdds")






router.get('/fixture',(req, res)=>{
     
})

router.get('/getOdds',getOdds,(req, res)=>{
     
})
router.get('/getTable',(req, res)=>{
     
})

router.get('/getCurrentTable',(req, res)=>{
     
})




module.exports=router;