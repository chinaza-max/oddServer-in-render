const passport=require('passport')
//const User=require("../MongoDB/Models/Users")
const signUpAdminStrategy=require("./signUpAdminStrategy")
const signUpSuperAdminStrategy=require("./loginSuperAdminStrategy")
const signupStaffStrategy=require("./signupStaffStrategy")

const loginAdminStrategy=require("./loginAdminStrategy")
const loginSuperAdminStrategy=require("./loginSuperAdminStrategy")
const loginStaffStrategy=require("./loginStaffSrategy")

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
passport.use("local-signUpSuperAdmin",signUpSuperAdminStrategy)
passport.use("local-signupStaff",signupStaffStrategy)


passport.use("local-loginAdmin",loginAdminStrategy)
passport.use("local-loginStaff",loginStaffStrategy)
passport.use("local-loginSuperAdmin",loginSuperAdminStrategy)

module.exports=passport