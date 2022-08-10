const express=require("express")
const passport=require('passport')
const rateLimit = require('express-rate-limit')
const Cookie = require('cookie')
const router=express.Router();
/*const axios = require('axios');
const CancelToken = axios.CancelToken;
const source = CancelToken.source();*/

const adminUser=require("../MongoDB/Models/Admin")
const superAdminUser=require("../MongoDB/Models/SuperAdmin")






// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB or API Gateway, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html


const loginSignUpRateLimiter = rateLimit(
                            {   max: 3, 
                                windowMS: 60 * 60 * 1000 ,
                                message:{"express":{"payload":"Too many request, please try again after an hour","status":false}}
                            })


router.post('/fixtures',(req, res)=>{
    
})

router.post('/updateFixtures',(req, res)=>{
     
})

module.exports=router;

