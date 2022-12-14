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
    hasBeenAssigned:{ 
        type:Boolean,
        required:true,
        default: false
    },
    status:{ 
        type:String,
        required:true,
        enum: ["open", "completed", "ongoing","cancelled"],
        default: "open" 
    } 
},
{ timestamps: true });

module.exports=mongoose.model("fixture",fixtureSchema);