const languageModel = require("../models/languageModel")
const tagModel = require("../models/tagModel")
const articleModel=require('../models/articleModel')
const slug = require('slug');
const { successJson } = require("./utility/jsonRes");
const authModel = require("../models/authModel");
const commentModel = require("../models/articleCommentModel");
const getTagLanguage=async(req,res)=>{
    const tagData=await tagModel.find()
    const languageData=await languageModel.find()
    const tag=[]
    const language=[]
    tagData.map(d=>{
        tag.push({value:d.slug,label:d.name})
    })
    languageData.map(d=>{
        language.push({value:d.slug,label:d.name})

    })
    res.json({tag,language})    

}
const getOneUserArticle=async(req,res)=>{
    const userId=req.params.id
    //console.log((userId));
    const {page}=req.query
    const limit=6
    const skip=(page-1)*limit   
    const article=await articleModel.find({ user: userId }).sort({_id:-1}).limit(limit).skip(skip)
    const articleCount=await articleModel.countDocuments()
    const totalPage=Math.ceil(articleCount/limit)
    res.json({
        totalPage:totalPage,
        article:article
    })
}
const getAllArticle=async(req,res)=>{
  const articles = await articleModel.find().sort({ _id: -1 });
  const article = await articleModel.findOne().sort({ comment_count: -1 }).populate('user', 'name') .exec();
  res.json({articles,article})
}
const getDetail = async (req, res) => {
  const articleId = req.params.id;
  const userId = req.params.userId; // Assuming you have user ID from middleware

  try {
    // Find the article and update the view count
    const article = await articleModel.findById(articleId).lean();
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    await articleModel.findByIdAndUpdate(articleId, {
      $inc: { view_count: 1 },
    });
    
    //retrieve comment
    const comments = await commentModel.find({
      article:articleId,
    }).populate("user", "+ name");
   

    // Check if the user has liked the article
    const user = await authModel.findById(userId);
    const userHasLiked = user.likedArticles.includes(articleId);

    // Include userHasLiked in the response
    res.json({ ...article,comments, userHasLiked });
  } catch (error) {
    console.error("Error fetching article details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



//create article
const createArticle=async(req,res)=>{

    //image to upload
    const{files,body}=req;
     const {authUser}=req;
    const fileName=files.image.name
    const filepath='public/images/'+fileName
    files.image.mv(filepath,(err)=>{
        console.log(err)
    })
    //prepare tag to article
    const tags=JSON.parse(body.tags)
    const tagQuery=[]
    tags.map(t=>{
        tagQuery.push({slug:t.value})
    })
    const tagData=await tagModel.find({
        $or:tagQuery,
    })
    //prepare language
    const languages=JSON.parse(body.languages)
    const languageQuery=[]
    languages.map(l=>{
        languageQuery.push({slug:l.value})
    })
    const languageData=await languageModel.find({
        $or:languageQuery,
    })

  await articleModel.create({
    slug: slug(body.title),
    title: body.title,
    description: body.description,
    tags: tagData,
    languages: languageData,
    image: fileName,
    user: authUser.id
  });
  res.json("success");

}
// edit article
const editArticle=async(req,res)=>{
     const article = await articleModel.findOne({ _id: req.params.slug }); //[]
     
     res.json(article);
      
}
 const update = async (req, res) => {
    const { files, body, params } = req;
  
    const dbData = await articleModel.findOne({ _id: params.id });
  
    if (files) {
      //image upload
      var fileName = files.image.name;
      const filePath = "public/images/" + fileName;
      files.image.mv(filePath, (err) => {
        console.log(err);
      });
    } else {
      fileName = dbData.image;
    }
  
    //prepare for tags
    const reqTags = JSON.parse(body.tags);
    const tagQuery = [];
    reqTags.map((t) => {
      tagQuery.push({ slug: t.value });
    });
    const dataTags = await tagModel.find({
      $or: tagQuery,
    });
  
    //prepare for category
    const reqLanguages = JSON.parse(body.languages);
    const languageQuery = [];
    reqLanguages.map((l) => {
      languageQuery.push({ slug: l.value });
    });
    const dataLanguage = await languageModel.find({
      $or: languageQuery,
    });
  
    await articleModel.findByIdAndUpdate(params.id, {
      slug: slug(body.title),
      title: body.title,
      description: body.description,
      tags: dataTags,
      languages: dataLanguage,
      image: fileName,
    });
    res.json(fileName);
  };

  //recommend
  
const deleteArticle=async(req,res)=>{
  
    const articleId=req.params.articleId;
    const userId=req.params.userId;
    const article = await articleModel.deleteOne({ _id: articleId, user: userId });
if (article) {
  console.log('Article deleted successfully:', article);
  res.json(successJson('suceess'))
} else {
  console.log('Article not found');
}
 

}
const mostComment=async(req,res)=>{
  const article = await articleModel.findOne().sort({ comment_count: -1 }).exec();
  res.json(article)
}
module.exports={getTagLanguage,mostComment,deleteArticle,getAllArticle,getOneUserArticle,getDetail,createArticle,update,editArticle}