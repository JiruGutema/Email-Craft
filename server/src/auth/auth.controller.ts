import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Request,
  Req,
  Res,
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

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Logout user' })
  @Post('logout')
  logout(@Req() req) {
    const userId = req.user.userId;
    return this.authService.logout(userId);
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

  @Get('is-admin')
  @UseGuards(AuthGuard)
  isAdmin(@Req() req) {
    return req.user.role === 'admin';
  }

  @Get('is-super-admin')
  @UseGuards(AuthGuard)
  isSuperAdmin(@Req() req) {
    return req.user.role === 'superadmin';
  }

  // @Redirect(`${process.env.CLIENT_RID_URL}/login/success`, 302)
  // async googleAuthRedirect(@Request() req) {
  //   const payload = { username: req.user.username, sub: req.user.id, role: req.user.role };
  //   const token = await this.jwtService.signAsync(payload);
  //   return {
  //     url: `${process.env.CLIENT_RID_URL}/login/success?token=${token}&user=${encodeURIComponent(JSON.stringify(req.user))}`,
  //   };
  // }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthRedirect(@Request() req, @Res({ passthrough: true }) res) {
    const payload = {
      username: req.user.username,
      sub: req.user.id,
      role: req.user.role,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d', // optional
    });

    // Set cookie
    res.cookie('access_token', token, {
      httpOnly: true, // prevents JS access (important!)
      secure: true, // use true in production (HTTPS)
      sameSite: 'none', // or 'none' if using cross-site requests
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Optional: send user data too (NOT as httpOnly)
    res.cookie('user', JSON.stringify(req.user), {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
    });

    res.cookie('logged_in', 'true', {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
    });

    // Redirect to frontend
    return res.redirect(
      `${process.env.CLIENT_RID_URL}/login/success`,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async delete(@Request() req) {
    return await this.authService.delete(req.user.userId);
  }
}
