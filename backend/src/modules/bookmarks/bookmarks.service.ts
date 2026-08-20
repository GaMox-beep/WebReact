import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { QueryBookmarkDto } from './dto/query-bookmark.dto';

@Injectable()
export class BookmarksService {
  constructor(private readonly prisma: PrismaService) {}

  async toggle(userId: string, novelId: string) {
    const novel = await this.prisma.novel.findUnique({
      where: { id: novelId },
      select: { id: true, title: true },
    });

    if (!novel) {
      throw new NotFoundException(`Không tìm thấy truyện với ID: ${novelId}`);
    }

    const existing = await this.prisma.bookmark.findUnique({
      where: {
        userId_novelId: {
          userId,
          novelId,
        },
      },
    });

    if (existing) {
      await this.prisma.bookmark.delete({
        where: {
          userId_novelId: {
            userId,
            novelId,
          },
        },
      });

      return {
        isBookmarked: false,
        message: `Đã xóa "${novel.title}" khỏi Tủ Truyện`,
      };
    }

    await this.prisma.bookmark.create({
      data: {
        userId,
        novelId,
      },
    });

    return {
      isBookmarked: true,
      message: `Đã thêm "${novel.title}" vào Tủ Truyện`,
    };
  }

  async findAll(userId: string, query: QueryBookmarkDto) {
    const { page = 1, limit = 12 } = query;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.bookmark.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          novel: {
            include: {
              categories: {
                include: { category: true },
              },
              _count: {
                select: { chapters: true },
              },
            },
          },
        },
      }),
      this.prisma.bookmark.count({ where: { userId } }),
    ]);

    return {
      items: items.map((b) => ({
        bookmarkId: b.id,
        bookmarkedAt: b.createdAt,
        ...b.novel,
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async checkStatus(userId: string | undefined, novelId: string) {
    if (!userId) {
      return { isBookmarked: false };
    }

    const existing = await this.prisma.bookmark.findUnique({
      where: {
        userId_novelId: {
          userId,
          novelId,
        },
      },
      select: { id: true },
    });

    return { isBookmarked: !!existing };
  }
}
