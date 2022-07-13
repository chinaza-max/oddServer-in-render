const mongoose=require('mongoose');


const staffSchema= new mongoose.Schema({
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

module.exports=mongoose.model("staff",staffSchema);