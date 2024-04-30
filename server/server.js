const express=require('express')
const cors=require('cors')
const fileupload=require('express-fileupload')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
require('dotenv').config()
const authRoute=require('./routes/authRoute')
const articleRoute=require('./routes/articleRoute')
const app=express()
mongoose.connect(process.env.DB)
.then(() => {
    console.log('connected to db')
})

//middleware
app.use(cookieParser())
app.use(express.json())
app.use(fileupload())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:'http://localhost:5173',credentials:true}))
app.use('/api',authRoute)
app.use('/api/auth/article',articleRoute)
app.listen(process.env.PORT,()=>{
    console.log('running on port 4000')
})

