const mongoose=require('mongoose');

const competitionRegistrationSchema= new mongoose.Schema({
   
    competitionType: {
        type: String,
        required: [true, "competitionType is required"],
        enum: ["interSchool", "intraSchool"],
    },
    competitionName: {
        type: String,
        required: [true, "competitionName is required"],
    },
    startDate:{ 
        type: Schema.Types.ObjectId,
        required: true 
    },
    hostName:{ 
        type:String,
        required:true,
        trim:true
    },
    venue:{
        type:String,
        required:true,
        trim:true
    },
    homeGoal:{ 
        type: Number, 
        default: 0 
    },
    awayGoal:{ 
        type: Number, 
        default: 0 
    },
},
{ timestamp: true });

module.exports=mongoose.model("competitionRegistration",competitionRegistrationSchema);