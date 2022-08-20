
const mongoose=require("mongoose");


const OddsSchema= new mongoose.Schema({
    fixtureId:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: "fixture",
        required: true
    },
    goalExpectancy:{
        home:{ 
            type: Number, 
            default: 0 
        },
        away:{ 
            type: Number, 
            default: 0 
        },
    },
    odds:{
        correctScore:{ 
            score00:{ 
                type: Number, 
                default: 0 
            },
            score01:{ 
                type: Number, 
                default: 0 
            },score02:{ 
                type: Number, 
                default: 0 
            },score03:{ 
                type: Number, 
                default: 0 
            },score04:{ 
                type: Number, 
                default: 0 
            },score05:{ 
                type: Number, 
                default: 0 
            },score10:{ 
                type: Number, 
                default: 0 
            },score11:{ 
                type: Number, 
                default: 0 
            },score12:{ 
                type: Number, 
                default: 0 
            },score13:{ 
                type: Number, 
                default: 0 
            },score14:{ 
                type: Number, 
                default: 0 
            },score15:{ 
                type: Number, 
                default: 0 
            },score20:{ 
                type: Number, 
                default: 0 
            },score21:{ 
                type: Number, 
                default: 0 
            },score22:{ 
                type: Number, 
                default: 0 
            },score23:{ 
                type: Number, 
                default: 0 
            },score24:{ 
                type: Number, 
                default: 0 
            },score25:{ 
                type: Number, 
                default: 0 
            },score30:{ 
                type: Number, 
                default: 0 
            },score31:{ 
                type: Number, 
                default: 0 
            },score32:{ 
                type: Number, 
                default: 0 
            },score33:{ 
                type: Number, 
                default: 0 
            },score34:{ 
                type: Number, 
                default: 0 
            },score35:{ 
                type: Number, 
                default: 0 
            },score40:{ 
                type: Number, 
                default: 0 
            },score41:{ 
                type: Number, 
                default: 0 
            },score42:{ 
                type: Number, 
                default: 0 
            },score43:{ 
                type: Number, 
                default: 0 
            },score44:{ 
                type: Number, 
                default: 0 
            },score45:{ 
                type: Number, 
                default: 0 
            },score50:{ 
                type: Number, 
                default: 0 
            },score51:{ 
                type: Number, 
                default: 0 
            },score52:{ 
                type: Number, 
                default: 0 
            },score53:{ 
                type: Number, 
                default: 0 
            },score54:{ 
                type: Number, 
                default: 0 
            },score55:{ 
                type: Number, 
                default: 0 
            }
        },
        Under:{
            goal05:{ 
                type: Number, 
                default: 0 
            },
            goal15:{ 
                type: Number, 
                default: 0 
            },
            goal25:{ 
                type: Number, 
                default: 0 
            },
            goal35:{ 
                type: Number, 
                default: 0 
            },
            goal45:{ 
                type: Number, 
                default: 0 
            },
            goal55:{ 
                type: Number, 
                default: 0 
            },
        },
        Over:{
            goal05:{ 
                type: Number, 
                default: 0 
            },
            goal15:{ 
                type: Number, 
                default: 0 
            },
            goal25:{ 
                type: Number, 
                default: 0 
            },
            goal35:{ 
                type: Number, 
                default: 0 
            },
            goal45:{ 
                type: Number, 
                default: 0 
            }
        },
        GoalLessDraw:{
            type: Number, 
                default: 0 
        },
        Draw:{
            type: Number, 
                default: 0 
        },
        HomeWIN:{
            type: Number, 
                default: 0 
        },
        AwayWIN:{
            type: Number, 
                default: 0 
        },
        GoalGoal:{
            type: Number, 
                default: 0 
        },
        GoalGoalAndHomeWin:{
            type: Number, 
                default: 0 
        },
        GoalGoalAndAwayWin:{
            type: Number, 
                default: 0 
        }
    }
},
{ timestamp: true });

module.exports=mongoose.model("odd",OddsSchema);