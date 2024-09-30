import Article from '../models/Article.js';

const articleRepository = {
  create: async (articleData) => {
    try {
      const article = new Article(articleData);
      return await article.save();
    } catch (error) {
      console.error('Error creating article:', error);
      throw new Error(`Failed to create article: ${error.message}`); // Improve the error with a custom message
    }
  },

  getAll: async (filter = {}) => {
    try {
      console.log('Getting articles with filter:', filter);
      const articles = await Article.find();
      console.log('Articles:', articles);
      return articles;
    } catch (error) {
      console.error('Error getting articles:', error);
      throw new Error(`Failed to get articles: ${error.message}`); // Improve the error with a custom message
    }
  },

  getById: async (id) => {
    return await Article.findById(id);
  },

  getBySlug: async (slug) => {
    return await Article.findOne({ slug });
  },

  update: async (id, updateData) => {
    return await Article.findByIdAndUpdate(id, updateData, { new: true });
  },

  delete: async (id) => {
    return await Article.findByIdAndDelete(id);
  },

  publish: async (id) => {
    return await Article.findByIdAndUpdate(id, 
      { status: 'published', publishedAt: new Date() }, 
      { new: true }
    );
  },

  search: async (query) => {
    return await Article.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } }
      ]
    });
  }
};

export default articleRepository;