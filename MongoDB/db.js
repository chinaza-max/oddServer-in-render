const mongoose=require('mongoose')
const User=require("../MongoDB/Model/User/superAdmin")


//process.env.App_MONGODB_URI||
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
        const user=new User()

        try{ 
            


            const hashedPassword=await bcrypt.hash(12345678,10)
            user.passWord=hashedPassword,
            user.firstName="admin",
            user.lastName="admin",
            user.tel=11111111111,
            user.email="admin@gmail.com",
            user.accountNumber=11111111111,
            user.accountName="admin",
            user.bank="admin",
            user.save(async function(err,data){

                if(err){
                    console.log(err)
                    return done(err,null)
                }
           
            })
        }
        catch(err){
            return done(err,null)
        }
}