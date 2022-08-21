const mongoose=require('mongoose');

const fixtureSchema= new mongoose.Schema({
    competitionId:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: "CompetitionRegistrations",
        required: true
    },
    homeTeamId:{
        type: String,
        ref: "teams",
        required: true
    },
    awayTeamId:{
        type: String,
        ref: "teams",
        required: true
    },
    startTime:{ 
        type:String,
        required: true 
    },
    startDate:{ 
        type:Date,
        required: true 
    },
    venue:{ 
        type:String,
        required:true,
        trim:true
    },
    status:{ 
        type:String,
        required:true,
        enum: ["open", "close", "ongoing","cancelled"]
    } 
},
{ timestamp: true });

module.exports=mongoose.model("fixture",fixtureSchema);
