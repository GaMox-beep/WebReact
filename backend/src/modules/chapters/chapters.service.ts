import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@Injectable()
export class ChaptersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createChapterDto: CreateChapterDto) {
    const { novelId, chapterNumber, title, content, isVip } = createChapterDto;

    // Kiểm tra truyện có tồn tại không
    const novel = await this.prisma.novel.findUnique({
      where: { id: novelId },
    });
    if (!novel) {
      throw new NotFoundException(`Không tìm thấy truyện với ID: ${novelId}`);
    }

    // Kiểm tra trùng chapterNumber trong cùng 1 truyện
    const existingChapter = await this.prisma.chapter.findUnique({
      where: {
        novelId_chapterNumber: {
          novelId,
          chapterNumber,
        },
      },
    });

    if (existingChapter) {
      throw new ConflictException(`Truyện này đã có Chương ${chapterNumber}`);
    }

    const chapter = await this.prisma.chapter.create({
      data: {
        novelId,
        chapterNumber,
        title,
        content,
        isVip: isVip ?? false,
      },
    });

    // Cập nhật updatedAt của Novel
    await this.prisma.novel.update({
      where: { id: novelId },
      data: { updatedAt: new Date() },
    });

    return chapter;
  }

  async findOne(id: string) {
    const chapter = await this.prisma.chapter.findUnique({
      where: { id },
      include: {
        novel: {
          select: {
            id: true,
            title: true,
            slug: true,
            authorName: true,
            coverUrl: true,
          },
        },
      },
    });

    if (!chapter) {
      throw new NotFoundException(`Không tìm thấy chương với ID: ${id}`);
    }

    // Tăng view cho Chapter và Novel
    await Promise.all([
      this.prisma.chapter.update({
        where: { id },
        data: { views: { increment: 1 } },
      }),
      this.prisma.novel.update({
        where: { id: chapter.novelId },
        data: { views: { increment: 1 } },
      }),
    ]);

    // Tìm chương trước và chương sau
    const [prevChapter, nextChapter] = await Promise.all([
      this.prisma.chapter.findFirst({
        where: {
          novelId: chapter.novelId,
          chapterNumber: { lt: chapter.chapterNumber },
        },
        orderBy: { chapterNumber: 'desc' },
        select: { id: true, chapterNumber: true, title: true },
      }),
      this.prisma.chapter.findFirst({
        where: {
          novelId: chapter.novelId,
          chapterNumber: { gt: chapter.chapterNumber },
        },
        orderBy: { chapterNumber: 'asc' },
        select: { id: true, chapterNumber: true, title: true },
      }),
    ]);

    return {
      ...chapter,
      views: chapter.views + 1,
      navigation: {
        prevChapter,
        nextChapter,
      },
    };
  }

  async findByNovelSlugAndNumber(slug: string, chapterNumber: number) {
    const novel = await this.prisma.novel.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        authorName: true,
        coverUrl: true,
      },
    });

    if (!novel) {
      throw new NotFoundException(`Không tìm thấy truyện với slug: ${slug}`);
    }

    const chapter = await this.prisma.chapter.findUnique({
      where: {
        novelId_chapterNumber: {
          novelId: novel.id,
          chapterNumber,
        },
      },
    });

    if (!chapter) {
      throw new NotFoundException(
        `Không tìm thấy Chương ${chapterNumber} của truyện ${novel.title}`,
      );
    }

    // Tăng view cho Chapter và Novel
    await Promise.all([
      this.prisma.chapter.update({
        where: { id: chapter.id },
        data: { views: { increment: 1 } },
      }),
      this.prisma.novel.update({
        where: { id: novel.id },
        data: { views: { increment: 1 } },
      }),
    ]);

    // Tìm chương trước và chương sau
    const [prevChapter, nextChapter] = await Promise.all([
      this.prisma.chapter.findFirst({
        where: {
          novelId: novel.id,
          chapterNumber: { lt: chapter.chapterNumber },
        },
        orderBy: { chapterNumber: 'desc' },
        select: { id: true, chapterNumber: true, title: true },
      }),
      this.prisma.chapter.findFirst({
        where: {
          novelId: novel.id,
          chapterNumber: { gt: chapter.chapterNumber },
        },
        orderBy: { chapterNumber: 'asc' },
        select: { id: true, chapterNumber: true, title: true },
      }),
    ]);

    return {
      ...chapter,
      views: chapter.views + 1,
      novel,
      navigation: {
        prevChapter,
        nextChapter,
      },
    };
  }

  async update(id: string, updateChapterDto: UpdateChapterDto) {
    const chapter = await this.prisma.chapter.findUnique({ where: { id } });
    if (!chapter) {
      throw new NotFoundException(`Không tìm thấy chương với ID: ${id}`);
    }

    if (
      updateChapterDto.chapterNumber &&
      updateChapterDto.chapterNumber !== chapter.chapterNumber
    ) {
      const existing = await this.prisma.chapter.findUnique({
        where: {
          novelId_chapterNumber: {
            novelId: chapter.novelId,
            chapterNumber: updateChapterDto.chapterNumber,
          },
        },
      });
      if (existing) {
        throw new ConflictException(
          `Truyện này đã có Chương ${updateChapterDto.chapterNumber}`,
        );
      }
    }

    return this.prisma.chapter.update({
      where: { id },
      data: updateChapterDto,
    });
  }

  async remove(id: string) {
    const chapter = await this.prisma.chapter.findUnique({ where: { id } });
    if (!chapter) {
      throw new NotFoundException(`Không tìm thấy chương với ID: ${id}`);
    }

    await this.prisma.chapter.delete({ where: { id } });
    return { message: 'Xóa chương thành công', id };
  }
}
