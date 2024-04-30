const express=require('express')
const {getTagLanguage, getAllArticle, createArticle, updateArticle, deleteArticle}=require('../controllers/articleController')
const {checkArticleAuth } = require('../middleware/checkArticleAuth')
const router=express.Router()

router.use(checkArticleAuth)
router.get('/tag-language',getTagLanguage)
//article crud route
router.get('/',getAllArticle)
router.post('/',createArticle)
router.put('/:slug',updateArticle)
router.delete('/:slug',deleteArticle)

module.exports=router