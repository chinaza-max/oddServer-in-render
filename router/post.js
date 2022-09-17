const express=require("express")
const passport=require('passport')
const rateLimit = require('express-rate-limit')
const Cookie = require('cookie')
const router=express.Router();






const goalExpentancy=require("../controllers/goalExpentancy");
const competitionRegistration = require("../controllers/registerCompetition");
const registerTeam = require("../controllers/registerTeam");
const {createFixture}=require("../controllers/fixtureController");
const updateResult=require("../controllers/updateResult");
const { register } = require("../controllers/registerPaticipatingTeams");
const { deleteFixture } = require("../controllers/fixtureController");
/*const axios = require('axios');
const CancelToken = axios.CancelToken;
const source = CancelToken.source();*/

//const adminUser=require("../MongoDB/Model/")
//const superAdminUser=require("../MongoDB/Models/SuperAdmin")






// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB or API Gateway, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html


const loginSignUpRateLimiter = rateLimit(
                            {   max: 3, 
                                windowMS: 60 * 60 * 1000 ,
                                message:{"express":{"payload":"Too many request, please try again after an hour","status":false}}
                            })




router.post('/RegisterCompetition',competitionRegistration,(req, res)=>{
    res.status(200).json({express:{payLoad:"Competition created sucessfully ",status:true}})
})


router.post('/RegisterTeam',registerTeam,(req, res)=>{
    res.status(200).json({express:{payLoad:"Registerteam created sucessfully ",status:true}})
})
router.post('/register-paticipating-teams/:id',register)
router.post('/CreateFixture',createFixture,goalExpentancy,(req, res)=>{
    
})

router.post('/updateFixture',(req, res)=>{
     
})

router.post('/deleteFixture/:id',deleteFixture)

router.post('/updateResult',updateResult,(req, res)=>{
     
})
module.exports=router;

