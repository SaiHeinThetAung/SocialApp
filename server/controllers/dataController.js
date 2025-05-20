const articleModel = require("../models/articleModel");
const TfIdf = require('node-tfidf');

function calculateTFIDF(blogs) {
  const tfidfInstance = new TfIdf();
  blogs.forEach(blog => {
    const content = [blog.title, ...blog.tags, ...blog.languages].join(' ');
    tfidfInstance.addDocument(content);
  });
  return tfidfInstance;
}

//  get TF-IDF vector for a given content
function getTFIDFVector(tfidfInstance, content) {
  const vector = [];
  tfidfInstance.tfidfs(content, (i, measure) => {
    vector.push(measure);
  });
  return vector;
}

// calculate cosine similarity between two TF-IDF vectors
function cosineSimilarity(vector1, vector2) {
  const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
  const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitude1 * magnitude2);
}

const recommend = async (req, res) => {
  const userId = req.params.id;

  const articles = await articleModel.find({ user: userId });
  console.log(articles.length);
  const tags = [];
  const languages = [];

  articles.forEach((ar, index) => {
    console.log(`Article ${index + 1}:`, ar);

    if (ar.tags && Array.isArray(ar.tags)) {
      const tagNames = ar.tags.map(tag => tag.name);
      tags.push(...tagNames);
    } else {
      console.log(`Article ${index + 1} has no tags or tags is not an array.`);
    }

    if (ar.languages && Array.isArray(ar.languages)) {
      const languageNames = ar.languages.map(language => language.name);
      languages.push(...languageNames);
    } else {
      console.log(`Article ${index + 1} has no languages or languages is not an array.`);
    }
  });
  // console.log(tags);
  // console.log(languages);

  const userPreferences = { tags: tags, languages: languages };

  if (userPreferences.tags.length > 0 || userPreferences.languages.length > 0) {
    try {
      const blogs = await articleModel.find({}, 'title _id tags languages image');
      const userContent = [...userPreferences.tags, ...userPreferences.languages].join(' ');
      const tfidfInstance = calculateTFIDF(blogs);
      const userVector = getTFIDFVector(tfidfInstance, userContent);
      const blogVectors = blogs.map(blog => getTFIDFVector(tfidfInstance, [...blog.tags, ...blog.languages].join(' ')));

      const blogSimilarities = blogs.map((blog, index) => ({
        _id: blog._id,
        image: blog.image,
        title: blog.title,
        similarity: cosineSimilarity(userVector, blogVectors[index])
      }));

      const recommendedBlogs = blogSimilarities.filter(blog => blog.similarity >= 0.3);

      // Sort blogs by similarity (highest first)
      recommendedBlogs.sort((a, b) => b.similarity - a.similarity);

      // Return top recommended blogs
      return res.json(recommendedBlogs);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    try {
      return res.json({message:'no article'})
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = { recommend };
