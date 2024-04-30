const express=require('express')
const {registerAuth, loginAuth,checkAuth,logout, expire}=require('../controllers/authController')
const {check}=require('express-validator')
const router=express.Router()

router.post('/register',[
    check('email',"Provide valid email").isEmail(),
    check('password',"must have at least 8 characters").isLength({min:6})
],registerAuth)

//login route
router.post('/login',loginAuth)
router.get('/checkAuth',checkAuth)
router.post('/logout',logout)
router.get('/expireTime',expire)

module.exports=router