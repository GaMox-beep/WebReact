import { Module } from '@nestjs/common';
import { NovelsController } from './novels.controller';
import { NovelsService } from './novels.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { UploadModule } from '../../upload/upload.module';

@Module({
  imports: [PrismaModule, UploadModule],
  controllers: [NovelsController],
  providers: [NovelsService],
  exports: [NovelsService],
})
export class NovelsModule {}
