
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
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
            },
            score01:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score02:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score03:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score04:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score05:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score10:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score11:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score12:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score13:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score14:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score15:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score20:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score21:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score22:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score23:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score24:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score25:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score30:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score31:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score32:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score33:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score34:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score35:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score40:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score41:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score42:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score43:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score44:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score45:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score50:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score51:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score52:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score53:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score54:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },score55:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            }
        },
        Under:{
            goal05:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },
            goal15:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },
            goal25:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },
            goal35:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },
            goal45:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },
            goal55:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },
        },
        Over:{
            goal05:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },
            goal15:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },
            goal25:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },
            goal35:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            },
            goal45:{ 
                market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
            }
        },
        GoalLessDraw:{
            market: { 
                    type: String
                },
            odd:{ 
                type: Number, 
                default: 0 
            } 
                 
        },
        Draw:{
            market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
        },
        HomeWIN:{
            market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
        },
        AwayWIN:{
            market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
        },
        GoalGoal:{
            market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
        },
        GoalGoalAndHomeWin:{
            market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
        },
        GoalGoalAndAwayWin:{
            market: { 
                    type: String
                },
                odd:{ 
                    type: Number, 
                    default: 0 
                } 
                 
        }
    }
},
{ timestamp: true });

module.exports=mongoose.model("odd",OddsSchema);