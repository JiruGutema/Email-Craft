import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, StrategyOptions } from "passport-google-oauth20";
import { UsersService } from "src/users/users.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private userService: UsersService,
        private configService: ConfigService
    ) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
            scope: ['email', 'profile'],
        } as StrategyOptions); // <-- Explicitly cast as StrategyOptions
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any> {
        try {
            console.log('Google user profile:', profile);
            const user = await this.userService.findOrCreateUser(profile);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    }
}