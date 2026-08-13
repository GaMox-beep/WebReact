import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

/**
 * MODULE (Hộp chứa bộ phận / Phòng ban):
 * - Nhiệm vụ: Đóng gói và liên kết các thành phần liên quan lại với nhau (Controllers, Services, Providers).
 * - controllers: Khai báo danh sách Controller thuộc Module này (UsersController).
 * - providers: Khai báo danh sách các Service sẽ được khởi tạo và quản lý trong module này (UsersService).
 * - exports: (Nếu có) Danh sách các Service mà Module này muốn chia sẻ cho các Module khác sử dụng.
 */
@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
