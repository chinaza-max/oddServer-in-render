const mongoose=require('mongoose')

//process.env.App_MONGODB_URI||
module.exports=mongoose.connect(process.env.App_MONGODB_URI||"mongodb://localhost:27017/campusBet", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  err=>{
      if(!err){
          console.log('connection succeeded')
      }
      else{
          console.log('error in connection '+ err)
      }
    }
)


   