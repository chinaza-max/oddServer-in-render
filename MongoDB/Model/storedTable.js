const mongoose=require('mongoose');

const tableSchema= new mongoose.Schema({
    table:Array,
    numberOfMatches:0,
    competitionId:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: "CompetitionRegistrations",
        required: true
    }
},
    { timestamps: true }
)


module.exports=mongoose.model("table",tableSchema);