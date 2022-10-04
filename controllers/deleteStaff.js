const User =require("../MongoDB/Model/User/staff");


async function deleteStaff(req,res,next){

    User.deleteOne({_id:req.params.id}).then(function(data){

        res.status(200).json({express:{payLoad:data,status:true}})
   
    }).catch(function(error){
        console.log(error); // Failure
        res.status(500).json({express:{payLoad:"server side error",status:false}})

    });

   
    
}   

module.exports = deleteStaff;