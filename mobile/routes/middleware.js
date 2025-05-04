const jwt = require('jsonwebtoken')
const result=require('../utils/result')
const config=require('../utils/config')

function mymiddleware(req,res,next){
    if(req.url=='/user/register' || req.url=='/user/login' || req.url=='/mobile/' ){
        next()
    }else{
        const token =req.headers.token
        if(token){
            try{
                const payload=jwt.verify(token,config.secret)
                req.headers.uid=payload.uid
                next()
            }catch(e){
                res.send(result.createErrorResult("Invalid token"))
            }
        }else{
            res.send(result.createErrorResult("Token is missing"))
        }
    }
}

module.exports=mymiddleware