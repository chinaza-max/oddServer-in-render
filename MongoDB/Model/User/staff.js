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
        type:String,
        required:true,
        trim:true
    },
    accountName:{
        type:String,
        required:true,
        trim:true
    },
    bank:{
        type:String,
        required:true,
        trim:true
    }
    ,
    sa:{
        type:String,
        enum: ['SA', 'ADMIN', 'EDITOR', 'GUEST'],
        required:true
    }
},
{ timestamps: true });

module.exports=mongoose.model("staff",staffSchema);