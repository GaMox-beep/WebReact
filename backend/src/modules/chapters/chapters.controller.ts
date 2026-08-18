import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../../common/guards/optional-jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Get('novel/:slug/:chapterNumber')
  async findByNovelSlugAndNumber(
    @Param('slug') slug: string,
    @Param('chapterNumber') chapterNumber: string,
    @CurrentUser() user?: { id?: string; role?: string; coins?: number } | null,
  ) {
    return this.chaptersService.findByNovelSlugAndNumber(
      slug,
      parseFloat(chapterNumber),
      user,
    );
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user?: { id?: string; role?: string; coins?: number } | null,
  ) {
    return this.chaptersService.findOne(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/unlock')
  async unlock(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.chaptersService.unlock(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createChapterDto: CreateChapterDto) {
    return this.chaptersService.create(createChapterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChapterDto: UpdateChapterDto,
  ) {
    return this.chaptersService.update(id, updateChapterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.chaptersService.remove(id);
  }
}
