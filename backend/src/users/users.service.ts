import { Injectable } from '@nestjs/common';

/**
 * SERVICE (Bộ xử lý logic / Đầu bếp):
 * - Nhiệm vụ: Thực hiện các logic nghiệp vụ (business logic) của dự án. Ví dụ: mã hóa mật khẩu, kiểm tra tính hợp lệ của dữ liệu, tính toán tiền xu đọc truyện, gọi Prisma để đọc/ghi database, v.v.
 * - Decorator @Injectable(): Cho phép Service này được "tiêm" (Dependency Injection) vào các Controller hoặc các Service khác khi cần sử dụng.
 * - Service KHÔNG biết hoặc không quan tâm request đến từ HTTP, GraphQL hay CLI. Nó chỉ nhận tham số đầu vào và xử lý trả về kết quả.
 */
@Injectable()
export class UsersService {}

