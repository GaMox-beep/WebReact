import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TokenService } from '../services/token.service';
import { GoogleProfileDto, GoogleAuthResult } from '../dto/google-auth.dto';

export type { GoogleAuthResult, GoogleProfileDto };

@Injectable()
export class GoogleOAuthUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(profile: GoogleProfileDto): Promise<GoogleAuthResult> {
    const existing = await this.prisma.oAuthAccount.findUnique({
      where: {
        provider_providerId: {
          provider: 'google',
          providerId: profile.providerId,
        },
      },
      include: { user: true },
    });

    // Known OAuth identity -> reissue tokens for the linked user.
    if (existing) {
      const user = existing.user;
      return this.buildResult(
        user.id,
        user.email,
        user.username,
        user.role,
        user.avatar,
        user.coins,
      );
    }

    // Unknown identity. Check whether the email already belongs to a User.
    const userByEmail = await this.prisma.user.findUnique({
      where: { email: profile.email },
    });

    if (userByEmail) {
      // Merge only when Google has verified the email. An unverified email cannot
      // claim an address another account already owns.
      if (!profile.emailVerified) {
        throw new UnauthorizedException('Email chưa được xác thực bởi Google');
      }
      await this.linkIdentity(userByEmail.id, profile);
      return this.buildResult(
        userByEmail.id,
        userByEmail.email,
        userByEmail.username,
        userByEmail.role,
        userByEmail.avatar,
        userByEmail.coins,
      );
    }

    // Fresh Google-only account. Derive a unique username, leave password NULL.
    const username = await this.generateUniqueUsername(
      profile.email,
      profile.displayName,
    );
    const newUser = await this.prisma.user.create({
      data: {
        email: profile.email,
        username,
        password: null,
        avatar: profile.avatar ?? null,
      },
    });

    await this.linkIdentity(newUser.id, profile);
    return this.buildResult(
      newUser.id,
      newUser.email,
      newUser.username,
      newUser.role,
      newUser.avatar,
      newUser.coins,
    );
  }

  private async linkIdentity(userId: string, profile: GoogleProfileDto) {
    await this.prisma.oAuthAccount.create({
      data: {
        provider: 'google',
        providerId: profile.providerId,
        email: profile.email,
        userId,
      },
    });
  }

  private async generateUniqueUsername(
    email: string,
    displayName?: string | null,
  ): Promise<string> {
    const localPart =
      email
        .split('@')[0]
        .replace(/[^a-zA-Z0-9_.-]/g, '')
        .slice(0, 20) || 'user';
    const base = displayName
      ? displayName.trim().replace(/\s+/g, '').slice(0, 20) || localPart
      : localPart;

    let candidate = base;
    let suffix = 1;

    while (true) {
      const exists = await this.prisma.user.findUnique({
        where: { username: candidate },
      });
      if (!exists) return candidate;
      suffix += 1;
      candidate = `${base}${suffix}`;
    }
  }

  private async buildResult(
    id: string,
    email: string,
    username: string,
    role: string,
    avatar: string | null,
    coins: number,
  ): Promise<GoogleAuthResult> {
    const tokens = await this.tokenService.generateTokens(id, email, role);
    return {
      user: { id, email, username, role, avatar, coins },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
