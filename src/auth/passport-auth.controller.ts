import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from './guards/auth.guard';
import { PassportLocalGuard } from './guards/passport-local.guard';

@Controller('auth-v2')
export class AuthV2Controller {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(PassportLocalGuard)
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Request() request) {
    return this.authService.me(request.user.username);
  }
}

