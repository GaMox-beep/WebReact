import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { NovelsModule } from './modules/novels/novels.module';
import { ChaptersModule } from './modules/chapters/chapters.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    NovelsModule,
    ChaptersModule,
    CategoriesModule,
    PaymentsModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
