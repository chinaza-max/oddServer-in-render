const mongoose=require('mongoose');


const competitionTableSchema= new mongoose.Schema({
    competitionTable:{
        type: String,
        ref: "CompetitionRegistrations",
        required: true,
    },
    position:[], 
    
},
{ timestamp: true });

module.exports=mongoose.model("competitionTable",competitionTableSchema);