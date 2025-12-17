const commentModel = require('../models/articleCommentModel');
const articleModel=require('../models/articleModel')
const model=require('../models/authModel')

const store=async(req,res)=>{
  const id = req.params.id;
  const { article_id, comment } = req.body;
  const data = await commentModel.create({
    user: id,
    article: article_id,
    comment,
  });
  await articleModel.findByIdAndUpdate(article_id, {
    $inc: { comment_count: 1 },
  });
  res.json(data);
 
}
const like= async (req, res) => {
  const { article_id } = req.body;
  const user_id=req.params.id;
  try {
    // Find the article and user
    const article = await articleModel.findById(article_id);
    const user = await model.findById(user_id);

    if (!article || !user) {
      return res.status(404).json({ error: "Article or user not found" });
    }

    // Check if the user has already liked the article
    const hasLiked = user.likedArticles.includes(article_id);

    if (hasLiked) {
      // User has already liked the article, so unlike it
      await articleModel.findByIdAndUpdate(article_id, {
        $inc: { like_count: -1 },
      });
      await model.findByIdAndUpdate(user_id, {
        $pull: { likedArticles: article_id },
      });
      return res.json("unliked");
    } else {
      // User has not liked the article, so like it
      await articleModel.findByIdAndUpdate(article_id, {
        $inc: { like_count: 1 },
      });
      await model.findByIdAndUpdate(user_id, {
        $addToSet: { likedArticles: article_id },
      });
      return res.json("liked");
    }
  } catch (error) {
    console.error("Error toggling like status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const readComment = async (req, res) => {
  const id = req.params.id;
  try {
    const comments = await commentModel
      .find({ article: id })
      .populate("user", "name") // Populates the user field with only the name
      .sort({ createdAt: -1 }); // Sort by createdAt in descending order

    res.json(comments);
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

const mostLikeArticle= async (req, res) => {
  const mostLike = await articleModel.find()
    .limit(10)
    .sort({ like_count: -1 });

  res.json(mostLike);
}

const mostViewArticle= async (req, res) => {
  const mostView = await articleModel.find()
    .limit(10)
    .sort({ view_count: -1 });

  res.json(mostView);
}


module.exports={store,like,readComment,mostLikeArticle,mostViewArticle}