const express=require("express")
const Tokens = require('csrf')
const Cookie = require('cookie')
const rateLimit = require('express-rate-limit')
const leagueTable = require("../controllers/table");
const router=express.Router();
const getOdds=require("../controllers/getOdds")
const getSuperAdmin=require("../controllers/getSuperAdmin")
const verifyJWT = require("../controllers/deserializeJWT")

let tokens=new Tokens()

router.get('/fixture',verifyJWT,(req, res)=>{})
router.get('/getOdds/:id',verifyJWT,getOdds,(req, res)=>{})
router.get('/getTable/:id',verifyJWT,leagueTable)
router.get('/getSuperAdmin',verifyJWT,getSuperAdmin,(req, res)=>{})



//this route protect all form submission 
router.get('/form',verifyJWT,function (req, res) {
 
    let secret = tokens.secretSync()
    let token = tokens.create(secret)
    res.setHeader('Set-Cookie', Cookie.serialize('csrfSecret',secret, {
        httpOnly: true,
    }));
    return  res.status(200).json({express:{payLoad:token,status:true}})    
   
})

module.exports=router;