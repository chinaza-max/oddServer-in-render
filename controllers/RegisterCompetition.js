const Competition =require("../MongoDB/Model/competitionRegistration");



async function RegisterCompetition(req,res,next){
    const competition=new Competition()
    
 
/*
    Competition.deleteMany({competitionType:'intraSchool'}).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
   */
    Competition.find(async (err,data)=>{
        if(err){
            console.log("check RegisterCompetition controller ")
            throw err
        }
        else{
            console.log(data)
        }
        
    })
    

    
    Competition.find({competitionType:req.body.competitionType,competitionName:req.body.competitionName,startDate:req.body.startDate,session:req.body.session},async (err,data)=>{
        if(err){
            console.log("check RegisterCompetition controller ")
            throw err
        }
        else{
            console.log(data)
            
            if(data.length==0){
                let myData=req.body
    
                competition.competitionType=myData.competitionType
                competition.competitionName=myData.competitionName
                competition.session=myData.session
                competition.startDate=myData.startDate
                competition.hostName=myData.hostName
                competition.school=myData.school
                competition.location=myData.location
                competition.level=myData.level
                competition.levelName=myData.levelName
                competition.country=myData.country
                competition.save(async function(err,data){
                    if(err){
                        console.log("check  RegisterCompetitioncontroller")
                        console.log(err)
                        return res.status(500).json({express:{payLoad:"server error",status:false}})
                    }
                    else{
                        next()
                    }
                })
            }
            else{
                res.status(403).json({express:{payLoad:"competition already exit",status:true}})
            }
        }
    })
    
}   

module.exports = RegisterCompetition;