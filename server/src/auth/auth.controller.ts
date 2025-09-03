import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
  Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, SignupUserDto } from './dto/auth.dto';
import { AuthGuard, CanLogin } from './guards/auth.guard';
import { GoogleAuthGuard } from './guards/google.guard';
import { JwtService } from '@nestjs/jwt';
import { userInfo } from 'os';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(CanLogin)
  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }
  @ApiOperation({ summary: 'Signup user' })
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
  async loginGoogle() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  @Redirect('http://localhost:3001/login/success', 302)
  async googleAuthRedirect(@Request() req) {
    const payload = { username: req.user.username, sub: req.user.id };
    const token = await this.jwtService.signAsync(payload);
    return {
      url: `http://localhost:3001/login/success?token=${token}&user=${encodeURIComponent(JSON.stringify(req.user))}`,
    };
  }

  @UseGuards(AuthGuard)
  @Get('delete')
  async delete(@Request() req) {
    return await this.authService.delete(req.user.userId);
  }

}
