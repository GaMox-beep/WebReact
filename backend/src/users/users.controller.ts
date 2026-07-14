import { Controller } from '@nestjs/common';

/**
 * CONTROLLER (Bộ điều hướng / Tiếp tân):
 * - Nhiệm vụ: Tiếp nhận các yêu cầu (HTTP Requests như GET, POST, PUT, DELETE) gửi từ Client (Frontend).
 * - Định tuyến (Routing): Decorator @Controller('users') xác định rằng mọi request gửi tới đường dẫn "/users" sẽ do Controller này xử lý.
 * - Controller CHỈ làm nhiệm vụ nhận dữ liệu đầu vào, kiểm tra tính hợp lệ sơ bộ, và chuyển tiếp công việc cho Service xử lý. Nó không trực tiếp tương tác với Database hay thực hiện logic nghiệp vụ phức tạp.
 */
@Controller('users')
export class UsersController {}

