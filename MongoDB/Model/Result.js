const mongoose=require('mongoose');

const ResultSchema= new mongoose.Schema({
    fixtureId:{
        type:  mongoose.Schema.Types.ObjectId,
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

ResultSchema.methods.getTable =async (competitionId) => {
    const aggregate = await this.aggregate([

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

ResultSchema.methods.getTeamResults =async (teamId) => {
    const aggregate = await this.aggregate([
  
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
    return aggregate;
}



ResultSchema.methods.getTotalscorePerCompetition=async (competitionName,date) => {
  const aggregate = await this.aggregate([

    {
      $match: {
        "createdAt": {
          $gte: ISODate(date)
        }
      }
    },
    {
      $lookup: {
        from: "fixture",
        localField: "fixtureID",
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
          $gte: ISODate(date)
        }
      }
    },
    {
      $lookup: {
        from: "competitionRegistration",
        localField: "fixture.competitionRegistrationId",
        foreignField: "id",
        as: "competitionRegistration"
      }
    },
    {
      $unwind: "$competitionRegistration"
    },
    {
      $match: {
        $and: [
          {
            "competitionRegistration.date": {
              $gte: ISODate(date)
            }
          },
          {
            "competitionRegistration.competitionName": {
              $eq: competitionName
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
          $sum: "$homegoal"
        },
        totalAwayGoalScore: {
          $sum: "$awaygoal"
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

ResultSchema.methods.getTotalscorePerTeam=async(competitionName,date,homeId,awayId) => {
  const aggregate = await this.aggregate([
    {
      $match: {
        "createdAt": {
          $gte: ISODate(date)
        }
      }
    },
    {
      $lookup: {
        from: "fixture",
        localField: "fixtureID",
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
          $gte: ISODate(date)
        }
      }
    },
    {
      $lookup: {
        from: "competitionRegistration",
        localField: "fixture.competitionRegistrationId",
        foreignField: "id",
        as: "competitionRegistration"
      }
    },
    {
      $unwind: "$competitionRegistration"
    },
    {
      $match: {
        $and: [
          {
            "competitionRegistration.date": {
              $gte: ISODate(date)
            }
          },
          {
            "competitionRegistration.competitionName": {
              $eq: competitionName
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
        }
      }
    }
    ]);
  return aggregate;
}




module.exports=mongoose.model("resultS",ResultSchema);