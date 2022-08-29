const mongoose=require('mongoose');

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

ResultSchema.methods.getTable =async (competitionId) => {
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
      { $match: {"competition._id": competitionId}  } 

    
      // group the data according to the competions
    //   {
    
    //     $group: { _id: "$competition._id", competition: { $push: "$$ROOT" } }
    
    //   },
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
      ]);
      console.log(aggregate)
    return aggregate;
}
let idToSearch = mongoose.Types.ObjectId("630b7536775debd0e468e95e")
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
          from: "fixture",
          localField: "fixtureId",
          foreignField: "id",
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
          from: "CompetitionRegistration",
          localField: "fixture.competitionId",
          foreignField: "id",
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
  
      this.model("resultS").aggregate([
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
            let: { "myFixtureId": "$fixtureId" },
            pipeline: [
                {
                    $match: {
                        $expr: { $eq: ["$_id", "$$myFixtureId"] }
                    }
                },
                {
                  $lookup: {
                    from: "CompetitionRegistrations",
                    let: { "myFixtureId": "$fixtureId" },
                    pipeline: [
                        {
                          $match: {
                              $expr: { $eq: [1, 1] }
                          }
                        },
                    ],
                    as: "CompetitionRegistrations"
                }
                 
                },
            ],
            as: "fixture"
        }
    }
      ]).then((data)=>{
        console.log("-------------data--------")
        console.log("-------------data--------")
       console.log(data[1])
      });
      
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
          from: "fixture",
          localField: "fixtureId",
          foreignField: "id",
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
          from: "CompetitionRegistration",
          localField: "fixture.competitionId",
          foreignField: "id",
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
          from: "fixture",
          localField: "fixtureId",
          foreignField: "id",
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
          from: "CompetitionRegistration",
          localField: "fixture.competitionId",
          foreignField: "id",
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




/*

* competion name should be unique for inter competition


*/


/*
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
            from: "fixture",
            localField: "fixtureId",
            foreignField: "id",
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
            from: "CompetitionRegistration",
            localField: "fixture.competitionId",
            foreignField: "id",
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
        ]).then((data)=>{
          console.log("-------------data--------")
          console.log("-------------data--------")
         console.log(data)
        });
        return aggregate;
        */