import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(userId: string, email: string, role: string) {
    const jwtSecret = process.env.JWT_SECRET;
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

    if (process.env.NODE_ENV === 'production' && (!jwtSecret || !jwtRefreshSecret)) {
      throw new InternalServerErrorException('JWT Secrets are not configured in production environment');
    }

    const payload = { sub: userId, email, role };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtSecret || 'dev_secret_jwt_key_novel_2026',
      expiresIn: (process.env.JWT_EXPIRATION || '1d') as any,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtRefreshSecret || 'dev_secret_refresh_jwt_key_novel_2026',
      expiresIn: (process.env.JWT_REFRESH_EXPIRATION || '7d') as any,
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async revokeTokensForUser(userId: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }
}
