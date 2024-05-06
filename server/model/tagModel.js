const mongoose=require('mongoose')
const tagSchema= new mongoose.Schema({
    slug:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
})
const tagModel=mongoose.model('tags',tagSchema)
module.exports=tagModel