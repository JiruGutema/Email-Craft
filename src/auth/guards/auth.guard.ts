import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { PrismaClient } from '@prisma/client';
const Prisma = new PrismaClient();
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization ? authorization.split(' ')[1] : null;
    if (!token) {
      throw new UnauthorizedException("No token provided");
    }
    if(request.user.password === "_google_oauth_user_") {
      throw new UnauthorizedException("Google OAuth users are not allowed. Try logging in with Google.");
    }
    try {
        
        const tokenPayload = await this.jwtService.verifyAsync(token);
        request.user = {
          userId: tokenPayload.sub,
          username: tokenPayload.username,
      };
      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }
      throw new UnauthorizedException('Invalid token');
    }
  }

}

@Injectable()
export class CanLogin implements CanActivate{
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.body;
    console.log('CanLogin Guard - User:', user);
    if (user && user.password === "_google_oauth_user_") {
      throw new UnauthorizedException("Google OAuth users are not allowed. Try logging in with Google.");
    }
    return true;
  }
}