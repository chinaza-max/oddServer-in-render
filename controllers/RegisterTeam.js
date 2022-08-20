const Team =require("../MongoDB/Model/Team");



async function Registerteam(req,res,next){
    const team=new Team()
    
 
/*
    Team.deleteMany({teamType:'interSchool'}).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
   
    Team.find(async (err,data)=>{
        if(err){
            console.log("check Registerteam controller ")
            throw err
        }
        else{
            console.log(data)
        }
        
    })
    */

    
    Team.find({teamName:req.body.teamName,teamCreatedYear:req.body.teamCreatedYear,department:req.body.department,faculty:req.body.faculty},async (err,data)=>{
        if(err){
            console.log("check Registerteam controller ")
            throw err
        }
        else{
            console.log(data)
            
            if(data.length==0){
                let myData=req.body

                team.teamName=myData.teamName
                team.teamCreatedYear=myData.teamCreatedYear
                team.department=myData.department
                team.faculty=myData.faculty
                team.save(async function(err,data){
                    if(err){
                        console.log("check  Registerteamcontroller")
                        console.log(err)
                        return res.status(500).json({express:{payLoad:"server error",status:false}})
                    }
                    else{
                        next()
                    }
                })
            }
            else{
                res.status(403).json({express:{payLoad:"team already exit",status:true}})
            }
        }
    })
    
}   

module.exports = Registerteam;