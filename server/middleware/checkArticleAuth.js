const jwt=require('jsonwebtoken')
const checkArticleAuth=(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.json('not auth')
    }
    jwt.verify(token,process.env.SECRET,(err,data)=>{
        if(err){
            return res.json('not auth')
        }
        req.authUser=data
        next()
    })}

module.exports={checkArticleAuth}