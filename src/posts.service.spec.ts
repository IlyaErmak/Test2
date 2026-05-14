import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      { text: 'Post 1' },
      { text: 'Post 2' },
      { text: 'Post 3' },
      { text: 'Post 4' },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      expect(postsService.findMany()).toEqual([
        { text: 'Post 1', id: '1' },
        { text: 'Post 2', id: '2' },
        { text: 'Post 3', id: '3' },
        { text: 'Post 4', id: '4' },
      ]);
    });

    it('should return correct posts for skip and limit options', () => {
      expect(postsService.findMany({ skip: 1, limit: 2 })).toEqual([
        { text: 'Post 2', id: '2' },
        { text: 'Post 3', id: '3' },
      ]);
    });

    it('should return posts after skipped posts if only skip option is passed', () => {
      expect(postsService.findMany({ skip: 2 })).toEqual([
        { text: 'Post 3', id: '3' },
        { text: 'Post 4', id: '4' },
      ]);
    });

    it('should return limited number of posts if only limit option is passed', () => {
      expect(postsService.findMany({ limit: 2 })).toEqual([
        { text: 'Post 1', id: '1' },
        { text: 'Post 2', id: '2' },
      ]);
    });

    it('should return an empty array when skip is equal to posts count', () => {
      expect(postsService.findMany({ skip: 4 })).toEqual([]);
    });

    it('should return an empty array when limit is zero', () => {
      expect(postsService.findMany({ limit: 0 })).toEqual([]);
    });
  });
});
