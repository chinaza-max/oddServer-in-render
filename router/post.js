const express=require("express")
const rateLimit = require('express-rate-limit')
const router=express.Router();





const goalExpentancy=require("../controllers/goalExpentancy");
const competitionRegistration = require("../controllers/registerCompetition");
const registerTeam = require("../controllers/registerTeam");
const {createFixture, updateFixture, getAllFixtureBasedOnCompetition, getAllFixtureBasedOnTeam}=require("../controllers/fixtureController");
const {updateResult,getResult, deleteResult }=require("../controllers/resultController");
const { register} = require("../controllers/registerPaticipatingTeams");
const { deleteFixture } = require("../controllers/fixtureController");
const  verifyJWTAdmin = require("../controllers/adminDeserializeJWT")
const  verifyJWT = require("../controllers/deserializeJWT")


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




router.post('/RegisterCompetition',verifyJWTAdmin,competitionRegistration,(req, res)=>{
    res.status(200).json({express:{payLoad:"Competition created sucessfully ",status:true}})
});

router.post('/RegisterTeam',verifyJWTAdmin,registerTeam,(req, res)=>{
    res.status(200).json({express:{payLoad:"Registerteam created sucessfully ",status:true}})
});
router.post('/register-paticipating-teams/:id',verifyJWTAdmin,register)
router.post('/create-fixture',createFixture,goalExpentancy);

router.put('/update-fixture/:id',verifyJWTAdmin,updateFixture);

router.delete('/delete-fixture/:id',verifyJWTAdmin,deleteFixture);

router.get('/get-all-fixture-based-on-competition/:id', verifyJWT,getAllFixtureBasedOnCompetition);

router.get('/get-all-fixture-based-on-team/:id',verifyJWT,getAllFixtureBasedOnTeam);

router.get('/get-fixture/:id',verifyJWT,getAllFixtureBasedOnTeam);


router.put('/updateResult/:id',verifyJWTAdmin,updateResult);
router.get('/get-result',verifyJWT,getResult);
router.delete('/delete-result',verifyJWTAdmin,deleteResult);



module.exports=router;

