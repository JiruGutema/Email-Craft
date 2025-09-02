import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, SignupUserDto } from './dto/create-auth.dto';
import { AuthGuard, CanLogin } from './guards/auth.guard';
import { GoogleAuthGuard } from './guards/google.guard';
import { JwtService } from '@nestjs/jwt';
import { userInfo } from 'os';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

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
  async me(@Request() request) {
    return await this.authService.me(request.user.username);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async googleAuth() {}

@UseGuards(GoogleAuthGuard)
 @Get('google/callback')
  async googleAuthRedirect(@Request() req) {

    const payload = { username: req.user.username, sub: req.user.id };
    const token = await this.jwtService.signAsync(payload);
    return { message: 'Google login successful', accessToken: token, user: req.user };
  }
}
