const Cookie = require('cookie')
const Tokens = require('csrf')


let tokens=new Tokens()


function csrfProtection(req,res,next){

    let cookies=Cookie.parse(req.headers.cookie || '');
    let secret=cookies.csrfSecret
    let token=req.body.csrftoken

    if(Object.keys(cookies).length === 0 && cookies.constructor === Object||cookies==""){
        return  res.status(403).json({express:{payLoad:'unauthorize access',status:false}})
    }
    else{

        if (!tokens.verify(secret, token)) {
            res.status(403).json({express:{payLoad:'invalid token!',status:false}})
        }       
        else{
            next(); 
        }
    }
    
}

module.exports=csrfProtection;