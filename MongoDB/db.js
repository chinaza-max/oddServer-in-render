const mongoose=require('mongoose')
const bcrypt=require('bcrypt');
const User=require("../MongoDB/Model/User/superAdmin")


module.exports=mongoose.connect(process.env.App_MONGODB_URI||"mongodb://localhost:27017/campusBet", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  err=>{
      if(!err){
          console.log('connection succeeded')
          registerDefaultAdmin()
      }
      else{
          console.log('error in connection '+ err)
      }
    }
)


async function registerDefaultAdmin(){

    User.find({ $or: [ { tel: { $eq: 11111111111 } }, { email: { $eq:"admin@gmail.com" } }] } ).then( async(resultUser, err)=>{
        if(err){
            console.log(err)
           throw err
       } 
       if(resultUser.length!=0){
            console.log("admin already exist")

            //console.log(resultUser)
        return 
        }
        else{
            const user=new User()

            try{ 
            
                const hashedPassword=await bcrypt.hash("12345678",10)
                user.passWord=hashedPassword,
                user.firstName="admin",
                user.lastName="admin",
                user.tel=11111111111,
                user.email="admin@gmail.com",
                user.accountNumber=11111111111,
                user.accountName="admin",
                user.bank="admin",
                user.sa='SA',
                user.save(async function(err,data){
    
                    if(err){
                        throw err
                    }
                    else{
                        console.log(data)
                    }
               
                })
            }
            catch(err){
                 throw err
            }
        }
    })   



  

}