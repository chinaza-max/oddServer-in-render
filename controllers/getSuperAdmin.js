const Admin =require("../MongoDB/Model/User/superAdmin");



async function getAdminFun(req,res,next){

    Admin.find({},(err,data)=>{
        console.log(data)
    })
        
 
 
/*
    Admin.deleteMany({AdminType:'interSchool'}).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
   
    Admin.find(async (err,data)=>{
        if(err){
            console.log("check RegisterAdmin controller ")
            throw err
        }
        else{
            console.log(data)
        }
        
    })
    */

    
    Admin.find({fixtureId:req.query.fixtureId},async (err,data)=>{
        
        if(err){
            console.log("check getAdmin controller ")
            return res.status(500).json({express:{payLoad:"server error",status:false}})

        }
        else{
            
            if(data.length==0){

              //  res.status(200).json({express:{payLoad:"no Admin found",status:true}})
            }
            else{
              
                
              //  res.status(200).json({express:{payLoad:table,status:true}})
            }
        }
    })
}   

module.exports = getAdminFun;