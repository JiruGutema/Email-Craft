import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, SignupUserDto } from './dto/create-auth.dto';
import { AuthGuard, CanLogin } from './guards/auth.guard';
import { GoogleAuthGuard } from './guards/google.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @UseGuards(CanLogin)
  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }
  @Post('signup')
  signup(@Body() signupUserDto: SignupUserDto) {
    return this.authService.signup(signupUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Request() request) {
    return this.authService.me(request.user.username);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async googleAuth() {}

@UseGuards(GoogleAuthGuard)
 @Get('google/callback')
  async googleAuthRedirect(@Req() req) {
    console.log('Google auth callback:', req);
    return req.user;
  }
}
