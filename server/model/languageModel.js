const mongoose=require('mongoose')
const languageSchema= new mongoose.Schema({
    slug:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
})
const languageModel=mongoose.model('languages',languageSchema)
module.exports=languageModel