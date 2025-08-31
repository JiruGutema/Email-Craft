import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

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
    try {
      const tokenPayload =await this.jwtService.verifyAsync(token);
      request.user = {
        userId: tokenPayload.sub,
        email: tokenPayload.username,
      }
      return true
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
