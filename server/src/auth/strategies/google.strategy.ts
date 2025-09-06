import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service';
import { randomBytes } from 'crypto';
import { Logger } from 'src/utils/utils';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private userService: UsersService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile','https://www.googleapis.com/auth/gmail.send'],
      accessType: 'offline',
      prompt: 'consent',    
    } as StrategyOptions);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ): Promise<any> {
    try {
      const { email, name, picture } = profile._json;
      let baseUsername = email.split('@')[0];
      let username = baseUsername;
      let usernameExists = await this.userService.findOneByUsername(username);

      // Alternative: Use crypto.randomBytes for unique suffix
      if (usernameExists && usernameExists.email === email) {
        do {
          const suffix = randomBytes(3).toString('hex'); // 6 hex chars
          username = `${baseUsername}_${suffix}`;
          usernameExists = await this.userService.findOneByUsername(username);
        } while (usernameExists);
      }

      let user = await this.userService.findOneByEmail(email);

      if (!user) {
        const password = '_google_oauth_user_';
        user = await this.userService.create({
          email,
          name,
          password,
          picture,
          username,
        });
    }
    if (user) {
      await this.userService.updateGoogleTokens(user.id, accessToken, refreshToken);
    }

      if (!user) {
        return { message: 'User registration failed' };
      }

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        picture: user.picture,
        name: user.name,
      };
    } catch (error) {
      Logger.error('Error occurred while validating user', error);
      return { message: 'Error occurred while validating user' };
    }
  }
}
