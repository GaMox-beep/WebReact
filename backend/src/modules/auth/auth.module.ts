import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { TokenService } from './services/token.service';
import { RegisterUseCase } from './use-cases/register.use-case';
import { LoginUseCase } from './use-cases/login.use-case';
import { LogoutUseCase } from './use-cases/logout.use-case';
import { GoogleOAuthUseCase } from './use-cases/google-oauth.use-case';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    TokenService,
    RegisterUseCase,
    LoginUseCase,
    LogoutUseCase,
    GoogleOAuthUseCase,
    JwtStrategy,
    GoogleStrategy,
  ],
  exports: [TokenService],
})
export class AuthModule {}
