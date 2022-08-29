const Fixture =require("../MongoDB/Model/Fixture");
const CompetitionRegistration=require("../MongoDB/Model/competitionRegistration")
const mongoose=require('mongoose')
const ToId=mongoose.Types.ObjectId

async function createFixture(req,res,next){
    const fixture=new Fixture()
    

    Fixture.deleteMany({venue:'stadium3'}).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });

   
    Fixture.find(async (err,data)=>{
        if(err){
            console.log("check createFixture controller ")
            return res.status(500).json({express:{payLoad:"server error",status:false}})

        }
        else{
         //  console.log("fixtures     :",data)
        }
        
    })


    
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
                res.status(403).json({express:{payLoad:"fixture already exit",status:true}})
            }
        }
    })
    
}   

module.exports = createFixture;