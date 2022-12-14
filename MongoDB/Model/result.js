const mongoose=require('mongoose');
var ObjectID = mongoose.Types.ObjectId;

const ResultSchema= new mongoose.Schema({
    fixtureId:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: "fixture",
        required: true
    },
    Cards:{
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
        }
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
    session:{ 
      type:{ 
          type: String, 
          enum: ["1st half", "2nd half","full time"],
      }
    }, 
    result:{ 
        type:{ 
            type: String, 
            enum: ["win", "draw","cancelled"]
        },
        team:{ 
            type: String
        }, 
    }
},
{ timestamps: true });





ResultSchema.methods.getTable =async function getTable(competitionId) {
   competitionId = new ObjectID(competitionId)
    const aggregate = await this.model("resultS").aggregate([
      // do a join with the table fixture,  
      {
        $lookup: {
          from: 'fixtures',
          localField: 'fixtureId',
          foreignField: '_id',
          as: 'fixture',
        }
      },
      { $unwind: '$scores' },

      { $unwind: '$fixture' },
      // do a join on another table called CompetitionRegistration
      {
        $lookup: {
          from: 'competitionregistrations',
          localField: 'fixture.competitionId',
          foreignField: '_id',
          as: 'competition',
        }
      },
      { $unwind: '$competition' },
      { $match: {"competition._id": competitionId}  } ,
      {
        $lookup: {
          from: 'teams',
          localField: 'fixture.homeTeamId',
          foreignField: '_id',
          as: 'homeTeam',
        }
      },
      { $unwind: '$homeTeam' },
      {
        $lookup: {
          from: 'teams',
          localField: 'fixture.awayTeamId',
          foreignField: '_id',
          as: 'awayTeam',
        }
      },
      { $unwind: '$awayTeam' },
      // {
      //   $group: {
      //     _id: '$homeTeam.id',
      //     totalGamePlayed: {
      //       $sum: 1
      //     },
      //     totalHomeGoalScore: {
      //       $sum: "$scores.home.goal"
      //     },
      //     totalAwayGoalScore: {
      //       $sum: "$scores.away.goal"
      //     }
      //   }
      // },
       ]);
       
    return aggregate;
}

ResultSchema.methods.getTeamResults =async function getTeamResults (teamId) {
    const aggregate = await this.model("resultS").aggregate([

        // do a join with the table fixture,  
        {
          $lookup: {
            from: 'fixture',
            localField: 'fixtureId',
            foreignField: '_id',
            as: 'fixture',
          }
        },
        { $unwind: '$fixture' },
        // do a join on another table called CompetitionRegistration
        {
          $lookup: {
            from: 'CompetitionRegistration',
            localField: 'fixture.competitionId',
            foreignField: '_id',
            as: 'competition',
          }
        },

        { $unwind: '$competition' },

        //filter the result to just the teams 
        { $match: 
            {$or:[{"fixture.homeTeamId": teamId},{"fixture.awayTeamId":teamId}]  } 
         },
         {
          $group: {
            _id: null,
            homeTeamTotalGoalScore: {
              $sum: {
                $cond: {
                  if: {
                    $eq: [
                      "$fixture.homeId",
                      homeId
                    ]
                  },
                  then: "$homegoal",
                  else: 0
                }
              }
            },
            homeTeamTotalGoalConceded: {
              $sum: {
                $cond: {
                  if: {
                    $eq: [
                      "$fixture.homeId",
                      homeId
                    ]
                  },
                  then: "$awaygoal",
                  else: 0
                }
              }
            },
            homeTeamTotalGamePlayed: {
              $sum: {
                $cond: {
                  if: {
                    $eq: [
                      "$fixture.homeId",
                      homeId
                    ]
                  },
                  then: 1,
                  else: 0
                }
              }
            },
            awayTeamTotalGoalScore: {
              $sum: {
                $cond: {
                  if: {
                    $eq: [
                      "$fixture.awayId",
                      awayId
                    ]
                  },
                  then: "$awaygoal",
                  else: 0
                }
              }
            },
            awayTeamTotalGoalConceded: {
              $sum: {
                $cond: {
                  if: {
                    $eq: [
                      "$fixture.awayId",
                      awayId
                    ]
                  },
                  then: "$homegoal",
                  else: 0
                }
              }
            },
            awayTeamTotalGamePlayed: {
              $sum: {
                $cond: {
                  if: {
                    $eq: [
                      "$fixture.awayId",
                      awayId
                    ]
                  },
                  then: 1,
                  else: 0
                }
              }
            },
            points: {
              $sum: {
                $cond: {
                  if: {
                    $gt: [
                      "$result.scores.home.goal" , "$result.scores.away.goal"
                      
                    ]
                  },
                  then: 3,
                  if: {
                    $eq: [
                      "$result.scores.home.goal ","$result.scores.away.goal",
                      awayId
                    ]
                  },
                  then: 1,
                  else: 0
                }
              }
            }

          }
        }
      ]);
      console.log(aggregate)
    return aggregate;
}

ResultSchema.methods.getTotalscorePerCompetition=async function getTotalscorePerCompetition (competitionName,date,competitionType,school,country,levelName){
  
  if(competitionType=="interSchool"){
    const aggregate = await this.model("resultS").aggregate([
      {
        $match: {
          "createdAt": {
            $gte: new Date(date)
          }
        }
      },
      {
        $lookup: {
          from: "fixtures",
          localField: "fixtureId",
          foreignField: "_id",
          as: "fixture"
        }
      },
      {
        $unwind: "$fixture"
      },
      {
        $match: {
          "fixture.createdAt": {
            $gte: new Date(date)
          },
          "fixture.status": {
            $eq:"completed"
          }
        }
      },
      {
        $lookup: {
          from: "competitionregistrations",
          localField: "fixture.competitionId",
          foreignField: "_id",
          as: "CompetitionRegistration"
        }
      },
      {
        $unwind: "$CompetitionRegistration"
      },
      {
        $match: {
          $and: [
            {
              "CompetitionRegistration.startDate": {
                $gte: new Date(date)
              }
            },
            {
              "CompetitionRegistration.competitionName": {
                $eq: competitionName
              }
            },
            {
              "CompetitionRegistration.country": {
                $eq: country
              }
            }
            ,
            {
              "CompetitionRegistration.competitionType": {
                $eq: competitionType
              }
            }
            
          ]
        }
      },
      {
        $group: {
          _id: null,
          totalGamePlayed: {
            $sum: 1
          },
          totalHomeGoalScore: {
            $sum: "$scores.home.goal"
          },
          totalAwayGoalScore: {
            $sum: "$scores.away.goal"
          }
        }
      },
      {
        $addFields: {
          totalGoal: {
            $add: [
              "$totalHomeGoal",
              "$totalAwayGoal"
            ]
          }
        }
      }
      ]);
      return aggregate;
  }
  else{
  
    const aggregate = await this.model("resultS").aggregate([
      {
        $match: {
          "createdAt": {
            $gte: new Date(date)
          }
        }
      },
      {
        $lookup: {
          from: "fixtures",
          localField: "fixtureId",
          foreignField: "_id",
          as: "fixture"
        }
      }
      ,
      {
        $unwind: "$fixture"
      },
      {
        $match: {
          "fixture.createdAt": {
            $gte: new Date(date)
          },
          "fixture.status": {
            $eq:"completed"
          }
        }
      }
      ,
      {
        $lookup: {
          from: "competitionregistrations",
          localField: "fixture.competitionId",
          foreignField: "_id",
          as: "CompetitionRegistration"
        }
      }
      ,
      {
        $unwind: "$CompetitionRegistration"
      }
      ,
      {
        $match: {
          $and: [
            {
              "CompetitionRegistration.startDate": {
                $gte: new Date(date)
              }
            },
            {
              "CompetitionRegistration.competitionName": {
                $eq: competitionName
              }
            }
            ,
            {
              "CompetitionRegistration.school": {
                $eq: school
              }
            }
            ,
            {
              "CompetitionRegistration.levelName": {
                $eq: levelName
              }
            }
            ,
            {
              "CompetitionRegistration.competitionType": {
                $eq: competitionType
              }
            }
          ]
        }
      },
      {
        $group: {
          _id: null,
          totalGamePlayed: {
            $sum: 1
          },
          totalHomeGoalScore: {
            $sum: "$scores.home.goal"
          },
          totalAwayGoalScore: {
            $sum: "$scores.away.goal"
          }
        }
      },
      {
        $addFields: {
          totalGoal: {
            $add: [
              "$totalHomeGoalScore",
              "$totalAwayGoalScore"
            ]
          }
        }
      }
      
      ])
      return aggregate
   
  }
}

ResultSchema.methods.getTotalscorePerTeam=async function (competitionName,date,homeId,awayId,competitionType,school,country,levelName){
  
  
  if(competitionType=="interSchool"){
    const aggregate = await this.model("resultS").aggregate([
      {
        $match: {
          "createdAt": {
            $gte: new Date(date)
          }
        }
      },
      {
        $lookup: {
          from: "fixtures",
          localField: "fixtureId",
          foreignField: "_id",
          as: "fixture"
        }
      },
      {
        $unwind: "$fixture"
      },
      {
        $match: {
          "fixture.createdAt": {
            $gte: new Date(date)
          },
            "fixture.status": {
              $eq:"completed"
            }
        }
      },
      {
        $lookup: {
          from: "competitionregistrations",
          localField: "fixture.competitionId",
          foreignField: "_id",
          as: "CompetitionRegistration"
        }
      },
      {
        $unwind: "$CompetitionRegistration"
      },
      {
        $match: {
          $and: [
            {
              "CompetitionRegistration.startDate": {
                $gte: new Date(date)
              }
            },
            {
              "CompetitionRegistration.competitionName": {
                $eq: competitionName
              }
            },
            {
              "CompetitionRegistration.country": {
                $eq: country
              }
            }
            ,
            {
              "CompetitionRegistration.competitionType": {
                $eq: competitionType
              }
            }
          ]
        }
      },
      {
        $group: {
          _id: null,
          homeTeamTotalGoalScore: {
            $sum: {
              $cond: {
                if: {
                  $eq: [
                    "$fixture.homeTeamId",
                    homeId
                  ]
                },
                then: "$scores.home.goal",
                else: 0
              }
            }
          },
          homeTeamTotalGoalConceded: {
            $sum: {
              $cond: {
                if: {
                  $eq: [
                    "$fixture.homeTeamId",
                    homeId
                  ]
                },
                then: "$scores.away.goal",
                else: 0
              }
            }
          },
          homeTeamTotalGamePlayed: {
            $sum: {
              $cond: {
                if: {
                  $eq: [
                    "$fixture.homeTeamId",
                    homeId
                  ]
                },
                then: 1,
                else: 0
              }
            }
          },
          awayTeamTotalGoalScore: {
            $sum: {
              $cond: {
                if: {
                  $eq: [
                    "$fixture.awayTeamId",
                    awayId
                  ]
                },
                then: "$scores.away.goal",
                else: 0
              }
            }
          },
          awayTeamTotalGoalConceded: {
            $sum: {
              $cond: {
                if: {
                  $eq: [
                    "$fixture.awayTeamId",
                    awayId
                  ]
                },
                then: "$scores.home.goal",
                else: 0
              }
            }
          },
          awayTeamTotalGamePlayed: {
            $sum: {
              $cond: {
                if: {
                  $eq: [
                    "$fixture.awayTeamId",
                    awayId
                  ]
                },
                then: 1,
                else: 0
              }
            }
          }
        }
      }
      ]);
    return aggregate;
  }
  else{
    const aggregate = await this.model("resultS").aggregate([
      {
        $match: {
          "createdAt": {
            $gte: new Date(date)
          }
        }
      },
      {
        $lookup: {
          from: "fixtures",
          localField: "fixtureId",
          foreignField: "_id",
          as: "fixture"
        }
      },
      {
        $unwind: "$fixture"
      },
      {
        $match: {
          "fixture.createdAt": {
            $gte: new Date(date)
          },
          "fixture.status": {
            $eq:"completed"
          }
        }
      },
      {
        $lookup: {
          from: "competitionregistrations",
          localField: "fixture.competitionId",
          foreignField: "_id",
          as: "CompetitionRegistration"
        }
      }
      ,
      {
        $unwind: "$CompetitionRegistration"
      }
      ,
      {
        $match: {
          $and: [
            {
              "CompetitionRegistration.startDate": {
                $gte: new Date(date)
              }
            },
            {
              "CompetitionRegistration.competitionName": {
                $eq: competitionName
              }
            },
            {
              "CompetitionRegistration.school": {
                $eq: school
              }
            }
            ,
              {
                "CompetitionRegistration.levelName": {
                  $eq: levelName
                }
              }
              ,
              {
                "CompetitionRegistration.competitionType": {
                  $eq: competitionType
                }
              }
          ]
        }
      },
      {
        $group: {
          _id: null,
          homeTeamTotalGoalScore: {
            $sum: {
              $cond: {
                if: {
                  $eq: [
                    "$fixture.homeTeamId",
                    homeId
                  ]
                },
                then: "$scores.home.goal",
                else: 0
              }
            }
          },
          homeTeamTotalGoalConceded: {
            $sum: {
              $cond: {
                if: {
                  $eq: [
                    "$fixture.homeTeamId",
                    homeId
                  ]
                },
                then: "$scores.away.goal",
                else: 0
              }
            }
          },
          homeTeamTotalGamePlayed: {
            $sum: {
              $cond: {
                if: {
                  $eq: [
                    "$fixture.homeTeamId",
                    homeId
                  ]
                },
                then: 1,
                else: 0
              }
            }
          },
          awayTeamTotalGoalScore: {
            $sum: {
              $cond: {
                if: {
                  $eq: [
                    "$fixture.awayTeamId",
                    awayId
                  ]
                },
                then: "$scores.away.goal",
                else: 0
              }
            }
          },
          awayTeamTotalGoalConceded: {
            $sum: {
              $cond: {
                if: {
                  $eq: [
                    "$fixture.awayTeamId",
                    awayId
                  ]
                },
                then: "$scores.home.goal",
                else: 0
              }
            }
          },
          awayTeamTotalGamePlayed: {
            $sum: {
              $cond: {
                if: {
                  $eq: [
                    "$fixture.awayTeamId",
                    awayId
                  ]
                },
                then: 1,
                else: 0
              }
            }
          }
        }
      }
    ]);

    return aggregate;
  }
 
}




module.exports=mongoose.model("resultS",ResultSchema);

