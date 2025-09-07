import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization ? authorization.split(' ')[1] : null;
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);
      if (tokenPayload.role !== 'admin') {
        throw new ForbiddenException('Admin access required');
      }
      request.user = {
        userId: tokenPayload.sub,
        username: tokenPayload.username,
        role: tokenPayload.role, 
      };
      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error; // Rethrow so NestJS returns 403
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}