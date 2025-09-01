import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    } as StrategyOptions); // <-- Explicitly cast as StrategyOptions
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ): Promise<any> {
    try {
      const { email, name, picture } = profile._json;

      let user = await this.userService.findOneByEmail(email);

      if (!user) {
        const username = email.split('@')[0];
        const password = '_google_oauth_user_';
        user = await this.userService.create({
          email,
          name,
          password,
          picture,
          username,
        });
      }

      if (!user) {
        return { message: 'User registration failed' };
      }

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          picture: user.picture,
        },
      };
    } catch (error) {
      console.log('Error occurred while validating user', error);
      return { message: 'Error occurred while validating user' };
    }
  }
}
