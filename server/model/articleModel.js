const mongoose=require('mongoose')
const articleSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      slug: { type: String, required: true },
    },
  ],
  languages: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      slug: { type: String, required: true },
    },
  ],
  like_count: {
    type: Number,
    default: 0,
  },
  comment_count: {
    type: Number,
    default: 0,
  },
  view_count: {
    type: Number,
    default: 0,
  }
 
});


const articleModel=mongoose.model('articles',articleSchema)
module.exports=articleModel
