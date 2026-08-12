import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback, StrategyOptions } from 'passport-google-oauth20';
import { GoogleOAuthUseCase } from '../use-cases/google-oauth.use-case';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly googleOAuthUseCase: GoogleOAuthUseCase) {
    const options: StrategyOptions = {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    };
    super(options);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    try {
      const email = profile.emails?.[0]?.value;
      if (!email) {
        return done(new Error('Google không cung cấp email'));
      }

      const result = await this.googleOAuthUseCase.authenticate({
        providerId: profile.id,
        email,
        emailVerified: Boolean(profile._json?.email_verified),
        displayName: profile.displayName ?? null,
        avatar: profile.photos?.[0]?.value ?? null,
      });

      return done(null, result);
    } catch (error) {
      return done(error);
    }
  }
}
