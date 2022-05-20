const passport=require('passport')
//const User=require("../MongoDB/Models/Users")
const signUpAdminStrategy=require("./signUpAdminStrategy")
const signUpSuperAdmin=require("./loginSuperAdminStrategy")
const loginAdminStrategy=require("./loginAdminStrategy")
const loginSuperAdminStrategy=require("./loginSuperAdminStrategy")

/*
passport.serializeUser((user,done)=>done(null,user.id))
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(err){return done(err)}
        done(null,user)
    })
})
*/

passport.use("local-signUpAdmin",signUpAdminStrategy)
passport.use("local-signUpSuperAdmin",signUpSuperAdmin)
passport.use("local-loginAdmin",loginAdminStrategy)
passport.use("local-loginSuperAdmin",loginSuperAdminStrategy)

module.exports=passport