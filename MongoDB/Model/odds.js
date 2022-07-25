const mongoose=require('mongoose');

const oddsSchema= new mongoose.Schema({
    fixtureId:{
        type: String,
        ref: "fixture",
        required: true,
    },
    odds:{
        AwayWIN:Number,
        Under:{
           goal05:Number,
           goal15:Number,
           goal25:Number,
        },
        CorrectScore:{
            score00:Number,
            score10:Number,
            score20:Number,
            score30:Number,
        }
    }
})
