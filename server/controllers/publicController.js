const commentModel = require("../models/articleCommentModel");
const articleModel=require('../models/articleModel')


const publicArticleDetail=async(req,res)=>{
    const id=req.params.id
    const article=await articleModel.findById(id)
    const comments = await commentModel.find({
      article:id,
    }).populate("user", "+ name");
    res.json({article,comments})
  }
  module.exports={publicArticleDetail}