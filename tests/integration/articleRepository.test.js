import articleRepository from '../../src/services/articleRepository.js';
import Article from '../../src/models/Article.js';
import { jest } from '@jest/globals';
import { Types } from 'mongoose';

jest.mock('../../src/models/Article.js');

describe('Article Repository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Article.find = jest.fn();
    Article.findById = jest.fn();
    Article.findByIdAndUpdate = jest.fn();
    Article.findByIdAndDelete = jest.fn();
    Article.findOne = jest.fn();
    Article.prototype.save = jest.fn();
  });

  describe('create', () => {
    it('should save a new article', async () => {
      const mockArticleData = { 
        title: 'Test Article', 
        content: 'Test content', 
        slug: 'test-article', 
        author: new Types.ObjectId() 
      };
      const mockSavedArticle = { ...mockArticleData, _id: 'some-id' };
      Article.prototype.save.mockResolvedValue(mockSavedArticle);

      const result = await articleRepository.create(mockArticleData);

      expect(Article.prototype.save).toHaveBeenCalled();
      expect(result).toEqual(mockSavedArticle);
    });
  });

  describe('getAll', () => {
    it('should return all articles', async () => {
      const mockArticles = [
        { _id: '1', title: 'Article 1' },
        { _id: '2', title: 'Article 2' }
      ];

      Article.find.mockResolvedValue(mockArticles);

      const result = await articleRepository.getAll();

      expect(Article.find).toHaveBeenCalledWith({});
      expect(result).toEqual(mockArticles);
    });

    it('should apply filter when provided', async () => {
      const mockFilter = { status: 'published' };
      Article.find.mockResolvedValue([]);

      await articleRepository.getAll(mockFilter);

      expect(Article.find).toHaveBeenCalledWith(mockFilter);
    });
  });

  describe('getById', () => {
    it('should return a single article by ID', async () => {
      const mockArticle = { _id: '1', title: 'Article 1' };

      Article.findById.mockResolvedValue(mockArticle);

      const result = await articleRepository.getById('1');

      expect(Article.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockArticle);
    });
  });

  describe('getBySlug', () => {
    it('should return a single article by slug', async () => {
      const mockArticle = { _id: '1', title: 'Article 1', slug: 'article-1' };

      Article.findOne.mockResolvedValue(mockArticle);

      const result = await articleRepository.getBySlug('article-1');

      expect(Article.findOne).toHaveBeenCalledWith({ slug: 'article-1' });
      expect(result).toEqual(mockArticle);
    });
  });

  describe('update', () => {
    it('should update an article', async () => {
      const mockId = '1';
      const mockUpdateData = { title: 'Updated Title' };
      const mockUpdatedArticle = { _id: '1', title: 'Updated Title', content: 'Original content' };

      Article.findByIdAndUpdate.mockResolvedValue(mockUpdatedArticle);

      const result = await articleRepository.update(mockId, mockUpdateData);

      expect(Article.findByIdAndUpdate).toHaveBeenCalledWith(mockId, mockUpdateData, { new: true });
      expect(result).toEqual(mockUpdatedArticle);
    });
  });

  describe('delete', () => {
    it('should delete an article', async () => {
      const mockId = '1';
      const mockDeletedArticle = { _id: '1', title: 'Deleted Article' };

      Article.findByIdAndDelete.mockResolvedValue(mockDeletedArticle);

      const result = await articleRepository.delete(mockId);

      expect(Article.findByIdAndDelete).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockDeletedArticle);
    });
  });

  describe('publish', () => {
    it('should publish an article', async () => {
      const mockId = '1';
      const mockPublishedArticle = { _id: '1', title: 'Published Article', status: 'published', publishedAt: expect.any(Date) };

      Article.findByIdAndUpdate.mockResolvedValue(mockPublishedArticle);

      const result = await articleRepository.publish(mockId);

      expect(Article.findByIdAndUpdate).toHaveBeenCalledWith(
        mockId,
        { status: 'published', publishedAt: expect.any(Date) },
        { new: true }
      );
      expect(result).toEqual(mockPublishedArticle);
    });
  });

  describe('search', () => {
    it('should search articles by title or content', async () => {
      const mockQuery = 'test';
      const mockSearchResults = [
        { _id: '1', title: 'Test Article 1' },
        { _id: '2', title: 'Article 2', content: 'Test content' }
      ];

      Article.find.mockResolvedValue(mockSearchResults);

      const result = await articleRepository.search(mockQuery);

      expect(Article.find).toHaveBeenCalledWith({
        $or: [
          { title: { $regex: mockQuery, $options: 'i' } },
          { content: { $regex: mockQuery, $options: 'i' } }
        ]
      });
      expect(result).toEqual(mockSearchResults);
    });
  });
});