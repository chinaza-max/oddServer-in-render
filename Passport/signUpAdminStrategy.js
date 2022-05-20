const bcrypt=require('bcrypt');
const User=require("../MongoDB/Models/Admin")
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

const signUpAdminStrategy=new LocalStrategy({usernameField: 'userName',
passwordField: 'password',passReqToCallback: true},(req,userName,password,done)=>{
            
    const user=new User()

        User.findOne({userName}).then( async(resultUser, err)=>{

            if(err){
                return done(err,null)
            } 

                //open later
                /*
            let userAttempts = await redis.get(tel);
            if (userAttempts > maxNumberOfFailedLogins) {
                return done({"payLoad":"Too many request, please try again after an hour","status":false},null)
            }

            */
            if(resultUser){
                    //open later
                    // await redis.set(tel, ++userAttempts, 'ex', timeWindowForFailedLogins)
                    return done({"payLoad":"user already exit","status":false},null)
            }
            else{
                try{ 

                    const hashedPassword=await bcrypt.hash(password,10)
                    user.password=hashedPassword,
                    user.userName=userName
                    user.save(async function(err,data){
                        if(err){
                            return done(err,null)
                        }
                        else{
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
                                console.log("check signUpAdminStrategy file where the jwt is been signed")
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

module.exports=signUpAdminStrategy;
