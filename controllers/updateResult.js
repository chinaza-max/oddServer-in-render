const Result =require("../MongoDB/Model/result");
const mongoose=require('mongoose')
const ToId=mongoose.Types.ObjectId

async function updateResult(req,res,next){
    const result=new Result()
    
/*
    Result.deleteMany({"result.type":'win'}).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
   */

    Result.find(async (err,data)=>{
        if(err){
            console.log("check updateResult controller ")
            throw err
        }
        else{
         //   console.log(data)
            
        }
        
    })


    
    Result.find({fixtureId:req.body.fixtureId},async (err,data)=>{
        if(err){
            console.log("check updateResult controller ")
            return res.status(500).json({express:{payLoad:"server error",status:false}})
        }
        else{
            console.log(data)
        
            if(data.length==0){
                const myData=req.body
                //console.log(myData.result)
                result.fixtureId=ToId(myData.fixtureId)
                result.scores.home.goal=myData.homeScore
                result.scores.away.goal=myData.awayScore
                result.Cards.redCard.home=myData.redCardHome
                result.Cards.redCard.away=myData.redCardAway
                result.Cards.yellowCard.home=myData.yellowCardHome
                result.Cards.yellowCard.away=myData.yellowCardAway
                result.result.type=myData.result;
                result.save(async function(err,data){
                    if(err){
                        console.log("check  updateResult controller")
                        console.log(err)
                        return res.status(500).json({express:{payLoad:"server error",status:false}})
                    }
                    else{
                      //  console.log(data)
                        return res.status(200).json({express:{payLoad:data,status:true}})
                    }
                })
            }
            else{
                const myData=req.body
                const update = { "$inc": { "scores.home.goal":myData.homeScore,"scores.away.goal":myData.awayScore, 
                    "Cards.redCard.home":myData.redCardHome, "Cards.redCard.away":myData.redCardAway,
                     "Cards.yellowCard.home":myData.yellowCardHome, "Cards.yellowCard.away":myData.yellowCardAway},
                     "$set": { "session":myData.session} }
        
                Result.findOneAndUpdate({fixtureId:myData.fixtureId},update,{new: true}).exec(function(err, doc){
                    if(err) {
                        //console.log(err);
                        //res.status(500).send(err);
                        return res.status(500).json({express:{"payLoad":"server error","status":false}})
                    } else {
                        
                            res.status(200).json({express:{payLoad:doc,status:true}})

                    }
                });

            }
        }
    })
    
}   

module.exports = updateResult;