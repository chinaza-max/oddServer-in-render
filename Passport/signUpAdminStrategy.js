const bcrypt=require('bcrypt');
const User=require("../MongoDB/Model/User/admin")
const jwt = require('jsonwebtoken');
const LocalStrategy=require('passport-local').Strategy
const Redis = require('ioredis')

/*
const redis = new Redis({
    port: 10699, // Redis port
    host: "redis-10699.c12.us-east-1-4.ec2.cloud.redislabs.com", // Redis host
    username: "default", // needs Redis >= 6
    password: "vr1ksiXL79YnSxirC7ROVPfNVrsSQOHo",
  });
*/
const maxNumberOfFailedLogins = 3;
const timeWindowForFailedLogins = 60 * 60 * 1;

const signUpAdmin=new LocalStrategy({usernameField: 'tel',
passwordField: 'passWord',passReqToCallback: true},(req,tel,passWord,done)=>{
            
    const user=new User()

    User.find({ $or: [ { tel: { $eq: tel } }, { email: { $eq: req.body.email } }] }).then( async(resultUser, err)=>{
            if(err){
            console.log(err)
            return done(err,null)
        } 

            //open later
            /*
        let userAttempts = await redis.get(tel);
        if (userAttempts > maxNumberOfFailedLogins) {
            return done({"payLoad":"Too many request, please try again after an hour","status":false},null)
        }

        */
        if(resultUser.length!=0){

           
                //open later
                // await redis.set(tel, ++userAttempts, 'ex', timeWindowForFailedLogins)
                return done({"payLoad":"user already exit","status":false},null)
        }
        else{
            try{ 
                
                const hashedPassword=await bcrypt.hash(passWord,10)
                user.passWord=hashedPassword,
                user.firstName=req.body.firstName,
                user.lastName=req.body.lastName,
                user.tel=req.body.tel,
                user.email=req.body.email,
                user.accountNumber=req.body.accountNumber,
                user.accountName=req.body.accountName,
                user.bank=req.body.bank,
                user.sa='ADMIN',
                user.save(async function(err,data){

                    if(err){
                        console.log(err)
                        return done(err,null)
                    }
                    else{
                        console.log(data)

                        //open later
                        //await redis.del(user.tel)

                        let payload1={"id":data.id,"tel":data.tel}
                        let payload2={"id":data.id}
                        
                        try{

                            jwt.sign(payload1,process.env.APP_PRIVATE_KEY_JWT, { algorithm: 'RS256',expiresIn: '5s'}, function(err,accessToken) {
                                if(err)throw err;
                                else{
                                    jwt.sign(payload2,process.env.APP_PRIVATE_KEY_JWT, { algorithm: 'RS256',expiresIn: '1y'}, function(err,refreshToken) {
                                        if(err)throw err;
                                        else{
                                            return done(null,{accessToken,refreshToken,payload2})
                                        }
                                    });
                                }
                            });
                        }catch(e){
                            console.log("check signUpAdmin file where the jwt is been signed")
                            throw e
                        }
                    }
                })
            }
            catch(err){
                return done(err,null)
            }
        }
    })
})

module.exports=signUpAdmin;
