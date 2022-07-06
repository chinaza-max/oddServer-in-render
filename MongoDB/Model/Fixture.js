const mongoose=require('mongoose');

const fixtureSchema= new mongoose.Schema({
    competitionId:{
        type: String,
        ref: "competitionRegistrations",
        required: true,
    },
    homeTeamId:{
        type: String,
        ref: "teams",
        required: true,
    },
    awayTeamId:{
        type: String,
        ref: "teams",
        required: true,
    },
    homeTeamGoal:{ 
        type: Number, 
        default: 0 
    },
    awayTeamGoal:{ 
        type: Number, 
        default: 0 
    },
    competitionType: {
        type: String,
        required: [true, "competitionType is required"],
        enum: ["interSchool", "intraSchool"],
    },
    competitionName: {
        type: String,
        required: [true, "competitionName is required"],
    },
    startTime:{ 
        type: Schema.Types.ObjectId,
        required: true 
    },
    venue:{ 
        type:String,
        required:true,
        trim:true
    } 
    ,
    status:{ 
        type:String,
        required:true,
        enum: ["open", "close", "ongoing"],
    } 
},
{ timestamp: true });

module.exports=mongoose.model("fixture",fixtureSchema);