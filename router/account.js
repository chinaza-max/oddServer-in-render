const express=require("express")
const passport=require('passport')
const rateLimit = require('express-rate-limit')
const Cookie = require('cookie')
const router=express.Router();



const loginSignUpRateLimiter = rateLimit(
                            {   max: 3, 
                                windowMS: 60 * 60 * 1000 ,
                                message:{"express":{"payload":"Too many request, please try again after an hour","status":false}}
                            })


//loginSignUpRateLimiter
router.post('/signupAdmin',(req, res, next)=>{
    passport.authenticate("local-signUpAdmin",(err, user, info) =>{
        if (err) {
            return res.status(400).json({express:err})
        }

        res.setHeader('Set-Cookie', Cookie.serialize('accessToken',user.accessToken, {
            httpOnly: true,
        }));

        /*
        res.setHeader('Set-Cookie', Cookie.serialize('refreshToken',user.refreshToken, {
            httpOnly: true,
            maxAge: 3.154e10
        }));
        */
        //user id(from mongoDB) is sent back;
        return res.status(200).json({express:{"payLoad":user.payload2,"status":true}})
    })(req, res, next)
})

router.post('/signupSuperAdmin',(req, res, next)=>{
    passport.authenticate("local-signUpSuperAdmin",(err, user, info) =>{
        if (err) {
            return res.status(400).json({express:err})
        }

        res.setHeader('Set-Cookie', Cookie.serialize('accessToken',user.accessToken, {
            httpOnly: true,
        }));

        /*
        res.setHeader('Set-Cookie', Cookie.serialize('refreshToken',user.refreshToken, {
            httpOnly: true,
            maxAge: 3.154e10
        }));
        */
        //user id(from mongoDB) is sent back;
        
        return res.status(200).json({express:{"payLoad":user.payload2,"status":true}})
    })(req, res, next)
})


router.post('/signupStaff',(req, res, next)=>{
    passport.authenticate("local-signupStaff",(err, user, info) =>{
        if (err) {
            return res.status(400).json({express:err})
        }

        res.setHeader('Set-Cookie', Cookie.serialize('accessToken',user.accessToken, {
            httpOnly: true,
        }));

        /*
        res.setHeader('Set-Cookie', Cookie.serialize('refreshToken',user.refreshToken, {
            httpOnly: true,
            maxAge: 3.154e10
        }));
        */
        //user id(from mongoDB) is sent back;
        return res.status(200).json({express:{"payLoad":user.payload2,"status":true}})
    })(req, res, next)
})


//loginSignUpRateLimiter
router.post('/loginAdmin',(req, res, next)=>{
    passport.authenticate("local-loginAdmin",(err, user, info) =>{
        if (err) {
            return res.status(400).json({express:err})
        }
        res.setHeader('Set-Cookie', Cookie.serialize('accessToken',user.accessToken, {
            httpOnly: true,
        }));
/*
        res.setHeader('Set-Cookie', Cookie.serialize('refreshToken',user.refreshToken, {
            httpOnly: true,
            maxAge: 3.154e10
        }));
        */
        //user id(from mongoDB) is sent back;
        return res.status(200).json({express:{"payLoad":user.payload2,"status":true}})
    })(req, res, next)
})

//loginSignUpRateLimiter
router.post('/loginSuperAdmin',(req, res, next)=>{
    passport.authenticate("local-loginSuperAdmin",(err, user, info) =>{
        if (err) {
            return res.status(400).json({express:err})
        }
        res.setHeader('Set-Cookie', Cookie.serialize('accessToken',user.accessToken, {
            httpOnly: true,
        }));
/*
        res.setHeader('Set-Cookie', Cookie.serialize('refreshToken',user.refreshToken, {
            httpOnly: true,
            maxAge: 3.154e10
        }));
        */
        //user id(from mongoDB) is sent back;
        return res.status(200).json({express:{"payLoad":user.payload2,"status":true}})
    })(req, res, next)
})

router.post('/loginStaff',(req, res, next)=>{
    passport.authenticate("local-loginStaff",(err, user, info) =>{
        if (err) {
            return res.status(400).json({express:err})
        }
        res.setHeader('Set-Cookie', Cookie.serialize('accessToken',user.accessToken, {
            httpOnly: true,
        }));
/*
        res.setHeader('Set-Cookie', Cookie.serialize('refreshToken',user.refreshToken, {
            httpOnly: true,
            maxAge: 3.154e10
        }));
        */
        //user id(from mongoDB) is sent back;
        return res.status(200).json({express:{"payLoad":user.payload2,"status":true}})
    })(req, res, next)
})






module.exports=router;

