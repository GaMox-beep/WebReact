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

  private async incrementViews(chapterId: string, novelId: string) {
    await Promise.all([
      this.prisma.chapter.update({
        where: { id: chapterId },
        data: { views: { increment: 1 } },
      }),
      this.prisma.novel.update({
        where: { id: novelId },
        data: { views: { increment: 1 } },
      }),
    ]);
  }

  private async getChapterNavigation(novelId: string, chapterNumber: number) {
    const [prevChapter, nextChapter] = await Promise.all([
      this.prisma.chapter.findFirst({
        where: {
          novelId,
          chapterNumber: { lt: chapterNumber },
        },
        orderBy: { chapterNumber: 'desc' },
        select: { id: true, chapterNumber: true, title: true },
      }),
      this.prisma.chapter.findFirst({
        where: {
          novelId,
          chapterNumber: { gt: chapterNumber },
        },
        orderBy: { chapterNumber: 'asc' },
        select: { id: true, chapterNumber: true, title: true },
      }),
    ]);
    return { prevChapter, nextChapter };
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

    await this.incrementViews(id, chapter.novelId);
    const navigation = await this.getChapterNavigation(chapter.novelId, chapter.chapterNumber);

    return {
      ...chapter,
      views: chapter.views + 1,
      navigation,
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

    await this.incrementViews(chapter.id, novel.id);
    const navigation = await this.getChapterNavigation(novel.id, chapter.chapterNumber);

    return {
      ...chapter,
      views: chapter.views + 1,
      novel,
      navigation,
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
