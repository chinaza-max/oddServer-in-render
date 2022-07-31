const mongoose=require('mongoose');


const teamSchema= new mongoose.Schema({
    organizationName:{ 
        type:String,
        required:true,
        trim:true
    }, 
    teamName:{ 
        type:String,
        required:true,
        trim:true
    },
    teamCreateYear:{
        type: Date,
        trim: true,
    },
    player:{
    type:[]
}
},
{ timestamp: true });

module.exports=mongoose.model("team",teamSchema);
