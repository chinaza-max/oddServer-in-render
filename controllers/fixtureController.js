const Fixture =require("../MongoDB/Model/fixture");
const CompetitionRegistration=require("../MongoDB/Model/competitionRegistration")
const mongoose=require('mongoose')
const Result = require("../MongoDB/Model/result");
const ToId=mongoose.Types.ObjectId

module.exports = {
 createFixture: async function createFixture(req,res,next){
    const fixture=new Fixture()
    
    
    /*
    Fixture.deleteMany({venue:'stadium5'}).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
    */
    /*
    Odds.deleteMany({venue:'stadium3'}).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
*/
/*
    Odds.find({},(eer,data)=>{
        //console.log(data)
       // console.log("Odds",data)
        if(data){
          //  console.log("result     :",data)
        // res.json({express:data})
            //data.getTeamResults("ee")
        }
    })

    Result.find({},(eer,data)=>{
        //console.log(data)
        //console.log("Result",data)
        if(data){
            //console.log("result     :",data)
        // res.json({express:data})
            //data.getTeamResults("ee")
        }
    })
   
    Fixture.find(async (err,data)=>{
        if(err){
            console.log("check createFixture controller ")
            return res.status(500).json({express:{payLoad:"server error",status:false}})

        }
        else{
            console.log("data")
        //  console.log("fixture",data)
        }
        
    })
*/


    Fixture.find({homeTeamId:req.body.homeTeamId, awayTeamId:req.body.awayTeamId, startDate:req.body.startDate},async (err,data)=>{
        if(err){
            console.log("check CreateFixture controller ")
            return res.status(500).json({express:{payLoad:"server error",status:false}})
        }
        else{
        
            if(data.length==0){
                let myData=req.body

                fixture.competitionId=ToId(myData.competitionId)
                fixture.homeTeamId=myData.homeTeamId
                fixture.awayTeamId=myData.awayTeamId
                fixture.startTime=myData.startTime
                fixture.startDate=myData.startDate
                fixture.venue=myData.venue
                fixture.status=myData.status
                fixture.save(async function(err,data1){
                    if(err){
                        console.log("check  CreateFixture")
                        console.log(err)
                        return res.status(500).json({express:{payLoad:"server error",status:false}})
                    }
                    else{
                        CompetitionRegistration.findOne({_id:req.body.competitionId}).populate('competitionName')
                        .exec(function (err, data2) {
                            if(err){
                                console.log("check CreateFixture controller ")
                                console.log(err)
                                return res.status(500).json({express:{payLoad:"server error",status:false}})
                            }
                            else{
                            
                                if(!data2){
                                    return res.status(200).json({express:{payLoad:"no competition use found",status:true}})
                                }
                                else{
                                    //console.log(data2)
                                    res.fixtureId=data1._id
                                    res.competitionName=data2.competitionName
                                    res.competitionType=data2.competitionType
                                    res.school=data2.school
                                    res.country=data2.country
                                    res.levelName=data2.levelName
                                    next()
                                }
                            }
                        })
                    }
                })
            }
            else{
                console.log(data)
              return  res.status(403).json({express:{payLoad:"fixture already exit",status:true}})
            }
        }
    })

},
deleteFixture: async (req,res)=>{
    const fixId = req.params.id
    await Fixture.findByIdAndDelete(fixId,async (err,data)=>{
        if (err){
            console.log(err)
          return  res.status(500).json({express:{payLoad:"server error",status:false}})
    }
    else if(data){
        await Result.findOneAndDelete({fixtureId:fixtureId},(err,data)=>{
            if (err){
                console.log(err)
              return  res.status(500).json({express:{payLoad:"server error",status:false}})
        }
        else{
           return  res.status(200).json({express:{payLoad:"success",status:true}})

        }});
      return  res.status(200).json({express:{payLoad:"success",status:true}})
    }
        else {
          return  res.status(403).json({express:{payLoad:"fixture does not exit",status:true}})

        }
    })
},
updateFixture: async (req,res)=>{
    const fixId= req.params.id
 const newFixUpdate = req.body;
 Fixture.findByIdAndUpdate(fixId,newFixUpdate,(err,data)=>{
    if (err){
        console.log(err)
      return  res.status(500).json({express:{payLoad:"server error",status:false}})
}
else if(data){
  return  res.status(200).json({express:{payLoad:"success",status:true}})
}
    else {
      return  res.status(403).json({express:{payLoad:"fixture does not exit",status:true}})

    }
}  )
 
},
getFixture: async (req,res)=>{
    const fixId = req.params.id
    Fixture.findById(fixId,(err,data)=>{
        if(err){
            console.log("getFixture error")
            return res.status(500).json({express:{payLoad:"server error",status:false}})

        }
        else{
            return res.status(200).json({express:{payLoad:data,status:true}})
        }
        
    })

},
getAllFixtureBasedOnCompetition: async (req,res)=>{
    const compId = req.params.id
    Fixture.find({competitionId:compId},(err,data)=>{
        if(err){
            console.log("getAllFixtureBasedOnCompetition error")
            return res.status(500).json({express:{payLoad:"server error",status:false}})

        }
        else{
            return res.status(200).json({express:{payLoad:data,status:true}})
        }
        
    })
        
    
},
getAllFixtureBasedOnTeam: async (req,res)=>{
    const teamId = req.params.id
    Fixture.find({$or: [{homeTeamId:teamId} , {awayTeamId:teamId}]},(err,data)=>{
        if(err){
            console.log("getAllFixtureBasedOnTeam error")
            return res.status(500).json({express:{payLoad:"server error",status:false}})

        }
        else{
            return res.status(200).json({express:{payLoad:data,status:true}})
        }
        
    })
}}   

