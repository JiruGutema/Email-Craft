import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class SendEmailGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;
    if (!userId) {
      throw new ForbiddenException('User not authenticated.');
    }

    // Query the database for Google tokens
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        googleAccessToken: true,
        googleRefreshToken: true,
      },
    });

    if (!user?.googleAccessToken) {
      throw new ForbiddenException('You must log in with Google to send email.');
    }

    return true;
  }
}