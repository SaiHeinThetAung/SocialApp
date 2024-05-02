const model=require('../models/authModel')
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const {validationResult}=require('express-validator')
const { errorJson, successJson } = require('./utility/jsonRes');

//login part
const loginAuth=async(req,res)=>{
    //console.log(req.body)
    const {email,password}=req.body
    if(email && password){
        const isEmail=await model.findOne({email})
    if(!isEmail ){
        return res.json(errorJson('invalid email'))
    }
    console.log(password,isEmail.password)
    const verify=await bcrypt.compare(password,isEmail.password)
    if(!verify){ 
        return res.json(errorJson('incorrect password'))
    }
    //jwt process
    const access_token=jwt.sign({name:isEmail.name,id:isEmail._id},process.env.SECRET)
    res.cookie('token',access_token,{httyOnly:true})
     return res.json(successJson('login success',{name:isEmail.name,id:isEmail._id}))   
    }
    return res.json(errorJson('fill'))
    
}

//register part
const registerAuth=async(req,res)=>{
    
    //errors returns array with errors
    // const errors=validationResult(req)
    // if(!errors.isEmpty()){
    //     const jt=errors
    //     console.log(jt.error.errors[0])
    //    return res.status(400).json({error:errors})
    // }
    //check is email already exists
    const {name,email,password}=req.body
    if(!(name && email && password)){
        return res.json(errorJson('fill'))
    }
    const findMail=await model.findOne({email})
    if(findMail){
        return res.json(errorJson('email already exists',null))
    }

    //hash password
    const hashPass= await bcrypt.hash(password,8)
    console.log(hashPass)
    const response=await model.create({name,email,password:hashPass})

    //jwt token
    const options = {
        expiresIn: '10s' // Set expiration time to 10 seconds
    }
    const access_token=jwt.sign({name},process.env.SECRET,options)
    res.cookie('token',access_token,{httyOnly:true})
    return res.status(200).json(successJson('success'))

}

//check auth
const checkAuth=async(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,process.env.SECRET,(err,data)=>{
        if(err){
            return res.json('not auth')
        }
        return res.json(data)
    })
}

//logout
const logout=async(req,res)=>{
    res.clearCookie('token')
    res.json('success')
}

//jwt expire time
const expire= async(req, res) => {
    const expireTime = 10; // For example, let's set it to 10 seconds
    res.json({expireTime});
};
module.exports={registerAuth,loginAuth,checkAuth,logout,expire}