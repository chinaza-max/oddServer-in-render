const mongoose=require('mongoose');


const teamSchema= new mongoose.Schema({
    teamName:{ 
        type:String,
        required:true,
        trim:true
    },
    department:{
        type:String,
        required:true,
        trim:true
    },
    faculty:{
        type:String,
        required:true,
        trim:true
    },
    teamCreatedYear:{
        type:String,
        required:true,
        trim:true
    },
    player:{
    type:[]
}
},
{ timestamps: true });

module.exports=mongoose.model("team",teamSchema);
