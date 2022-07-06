const mongoose=require('mongoose');


const teamSchema= new mongoose.Schema({
    competitionType: {
        type: String,
        required: [true, "competitionType is required"],
        enum: ["interSchool", "intraSchool"],
    },
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
    }
},
{ timestamp: true });

module.exports=mongoose.model("team",teamSchema);