const mongoose=require('mongoose');


const superAdminSchema= new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        trim:true
    },
    lastName:{ 
        type:String,
        required:true,
        trim:true
    }, 
    tel:{ 
        type:Number,
        required:true,
        trim:true
    },
    passWord:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    accountNumber:{
        type:Number,
        required:true,
        trim:true
    },
    accountName:{
        type:String,
        required:true
    },
    bank:{
        type:String,
        required:true
    }
},
{ timestamps: true });

module.exports=mongoose.model("superAdmin",superAdminSchema);