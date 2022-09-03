const Odds =require("../MongoDB/Model/Odds");



async function getOddsFun(req,res,next){


    console.log(req.query.fixtureId)
 
/*
    odds.deleteMany({oddsType:'interSchool'}).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
   
    odds.find(async (err,data)=>{
        if(err){
            console.log("check Registerodds controller ")
            throw err
        }
        else{
            console.log(data)
        }
        
    })
    */

    
    Odds.find({fixtureId:req.query.fixtureId},async (err,data)=>{
        
        if(err){
            console.log("check getOdds controller ")
            return res.status(500).json({express:{payLoad:"server error",status:false}})

        }
        else{
            
            if(data.length==0){

                console.log("data")
                res.status(200).json({express:{payLoad:"no odds found",status:true}})
            }
            else{
                console.log("data")
                console.log(data)
            }
        }
    })
    
}   

module.exports = getOddsFun;