import { Injectable } from '@nestjs/common';
import { TokenService } from '../services/token.service';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly tokenService: TokenService) {}

  async execute(userId: string) {
    await this.tokenService.revokeTokensForUser(userId);

    return {
      message: 'Đăng xuất thành công',
    };
  }
}
