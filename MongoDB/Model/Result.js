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

ResultSchema.methods.getTable = (competitionId) => {
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

ResultSchema.methods.getTeamResults = (teamId) => {
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
module.exports=mongoose.model("resultS",ResultSchema);
