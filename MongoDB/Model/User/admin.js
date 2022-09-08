const mongoose=require('mongoose');


const adminSchema= new mongoose.Schema({
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
        type:String,
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
    }
},
{ timestamp: true });

module.exports=mongoose.model("admin",adminSchema);