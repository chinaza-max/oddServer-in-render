const mongoose=require('mongoose');

const ResultSchema= new mongoose.Schema({
    fixtureId:{
        type: String,
        ref: "fixture",
        required: true
    },
    redCard: {
        home:{ 
            type: Number, 
            default: 0 
        },
        away:{ 
            type: Number, 
            default: 0 
        },
    },
    yellowCard: {
        home:{ 
            type: Number, 
            default: 0 
        },
        away:{ 
            type: Number, 
            default: 0 
        },
    },
    scores:{ 
        home:{ 
            goal:{ 
                type: Number, 
                default: 0 
            },
            player:[]
        },
        away:{ 
            goal:{ 
                type: Number, 
                default: 0 
            },
            player:[]
        }, 
    }, 
    result:{ 
        type:{ 
            type: String, 
            enum: ["win", "draw","cancelled"],
        },
        team:{ 
            type: String
        }, 
    }
},
{ timestamp: true });

module.exports=mongoose.model("resultS",ResultSchema);