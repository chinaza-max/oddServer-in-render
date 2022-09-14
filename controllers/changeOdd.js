const FixtureOdds =require("../MongoDB/Model/Odds")



async function changeOdd(req,res,next){

    if(req.body.fixtureId){
        const fixtureId=req.body.fixtureId
        const update = {"$set": {[`odds.${req.body.marketPath}.odd`]:req.body.to}}
            
        FixtureOdds.findOneAndUpdate({fixtureId},update,{new: true}).exec(function(err, doc){
        if(err) {
            //console.log(err);
            return res.status(500).json({express:{"payLoad":"server error","status":false}})
        } else {
            
            res.status(200).json({express:{payLoad:doc,status:true}})
        }
        });
    }

}   

module.exports = changeOdd;