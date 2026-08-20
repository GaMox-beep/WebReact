import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('BookmarksService', () => {
  let service: BookmarksService;
  let prismaService: any;

  beforeEach(async () => {
    const mockPrisma = {
      novel: {
        findUnique: jest.fn(),
      },
      bookmark: {
        findUnique: jest.fn(),
        create: jest.fn(),
        delete: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookmarksService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<BookmarksService>(BookmarksService);
    prismaService = module.get(PrismaService);
  });

  describe('toggle', () => {
    it('should throw NotFoundException if novel does not exist', async () => {
      prismaService.novel.findUnique.mockResolvedValue(null);

      await expect(service.toggle('user-1', 'novel-999')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should delete bookmark and return isBookmarked: false if already bookmarked', async () => {
      prismaService.novel.findUnique.mockResolvedValue({
        id: 'novel-1',
        title: 'Đấu Phá Thương Khung',
      });
      prismaService.bookmark.findUnique.mockResolvedValue({
        id: 'bookmark-1',
        userId: 'user-1',
        novelId: 'novel-1',
      });
      prismaService.bookmark.delete.mockResolvedValue({});

      const result = await service.toggle('user-1', 'novel-1');

      expect(prismaService.bookmark.delete).toHaveBeenCalledWith({
        where: {
          userId_novelId: {
            userId: 'user-1',
            novelId: 'novel-1',
          },
        },
      });
      expect(result.isBookmarked).toBe(false);
      expect(result.message).toContain('Đã xóa');
    });

    it('should create bookmark and return isBookmarked: true if not yet bookmarked', async () => {
      prismaService.novel.findUnique.mockResolvedValue({
        id: 'novel-1',
        title: 'Đấu Phá Thương Khung',
      });
      prismaService.bookmark.findUnique.mockResolvedValue(null);
      prismaService.bookmark.create.mockResolvedValue({
        id: 'bookmark-1',
        userId: 'user-1',
        novelId: 'novel-1',
      });

      const result = await service.toggle('user-1', 'novel-1');

      expect(prismaService.bookmark.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-1',
          novelId: 'novel-1',
        },
      });
      expect(result.isBookmarked).toBe(true);
      expect(result.message).toContain('Đã thêm');
    });
  });

  describe('findAll', () => {
    it('should return paginated list of bookmarked novels', async () => {
      const mockBookmarks = [
        {
          id: 'bm-1',
          createdAt: new Date(),
          novel: {
            id: 'n-1',
            title: 'Truyện 1',
            slug: 'truyen-1',
            categories: [],
            _count: { chapters: 10 },
          },
        },
      ];

      prismaService.bookmark.findMany.mockResolvedValue(mockBookmarks);
      prismaService.bookmark.count.mockResolvedValue(1);

      const result = await service.findAll('user-1', { page: 1, limit: 12 });

      expect(result.items.length).toBe(1);
      expect(result.items[0].title).toBe('Truyện 1');
      expect(result.meta.total).toBe(1);
      expect(result.meta.totalPages).toBe(1);
    });
  });

  describe('checkStatus', () => {
    it('should return isBookmarked: false if userId is not provided', async () => {
      const result = await service.checkStatus(undefined, 'n-1');
      expect(result.isBookmarked).toBe(false);
    });

    it('should return isBookmarked: true if bookmark exists', async () => {
      prismaService.bookmark.findUnique.mockResolvedValue({ id: 'bm-1' });

      const result = await service.checkStatus('user-1', 'n-1');
      expect(result.isBookmarked).toBe(true);
    });
  });
});
