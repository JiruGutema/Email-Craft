import {
  Controller,
  Get,
  Post,
  Body,
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

  @Get("is-admin")
  @UseGuards(AuthGuard)
  isAdmin(@Req() req) {
    return req.user.role === 'admin';
  }

  @Get('is-super-admin')
  @UseGuards(AuthGuard)
  isSuperAdmin(@Req() req) {
    return req.user.role === 'superadmin';
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  @Redirect(`${process.env.CLIENT_RID_URL}/login/success`, 302)
  async googleAuthRedirect(@Request() req) {
    const payload = { username: req.user.username, sub: req.user.id, role: req.user.role };
    const token = await this.jwtService.signAsync(payload);
    return {
      url: `${process.env.CLIENT_RID_URL}/login/success?token=${token}&user=${encodeURIComponent(JSON.stringify(req.user))}`,
    };
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async delete(@Request() req) {
    return await this.authService.delete(req.user.userId);
  }

}
