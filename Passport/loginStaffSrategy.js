const bcrypt=require('bcrypt');
const User=require("../MongoDB/Model/User/staff")
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
const timeWindowForFailedLogins = 60 * 60 * 1


const loginStaff=new LocalStrategy({usernameField: 'tel',
    passwordField: 'passWord',passReqToCallback: true},(req,tel,passWord,done)=>{
   
      
        User.find({ tel},async(err,user)=>{
       
            if(err){
                return done(err);
            }
            
            //open later
            /*
            let userAttempts = await redis.get(tel);
            if (userAttempts > maxNumberOfFailedLogins) {
                return done({"payLoad":"Too many request, please try again after an hour","status":false},null)
            }
          */

            if(user.length==0){
                
                //open later
               // await redis.set(tel, ++userAttempts, 'ex', timeWindowForFailedLogins)
                return done({"payLoad":'user not found',"status":false},null)
    
            }
            try{

                if(await bcrypt.compare(passWord,user[0].passWord)){
                    
                    //open later
                    //await redis.del(user.tel)
    
                    let payload1={"id":user[0].id,"tel":user[0].tel,type:"staff"}
                    let payload2={"id":user[0].id,type:"staff"}
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
                        console.log("check loginLocalStrategy file where the jwt is been signed")
                        throw e
                    }
                } 
                else{
                    return done({"payLoad":'user not found',"status":false},null)
                }
            } catch(e){
                    return done(e)
            }
        })
})

module.exports=loginStaff;