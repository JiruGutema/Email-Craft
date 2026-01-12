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
  logout(@Req() req, @Res({ passthrough: true }) res) {
    const userId = req.user.userId;
    
    // Clear all auth cookies
    const clearCookieOptions = {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
      path: '/',
    };

    res.clearCookie('access_token', { ...clearCookieOptions, httpOnly: true });
    res.clearCookie('user', clearCookieOptions);
    res.clearCookie('logged_in', clearCookieOptions);
    
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

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthRedirect(@Request() req, @Res() res) {
    const payload = {
      username: req.user.username,
      sub: req.user.id,
      role: req.user.role,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    const isProduction = process.env.NODE_ENV === 'production';
    
    // Base cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // Only secure in production (HTTPS)
      sameSite: isProduction ? 'none' as const : 'lax' as const, // 'none' for cross-origin in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/', // Ensure cookies are available on all paths
    };

    // Don't set domain for cross-origin cookies - let browser handle it
    // The domain restriction was causing the issue

    console.log('🍪 Setting cookies with options:', cookieOptions);
    console.log('🍪 isProduction:', isProduction);
    console.log('🍪 CLIENT_RID_URL:', process.env.CLIENT_RID_URL);

    res.cookie('access_token', token, cookieOptions);

    res.cookie('user', JSON.stringify(req.user), {
      ...cookieOptions,
      httpOnly: false, // Client needs to read this
    });

    res.cookie('logged_in', 'true', {
      ...cookieOptions,
      httpOnly: false, // Client needs to read this
    });

    res.send(`
  <html>
    <body>
      <script>
        window.location.href = "${process.env.CLIENT_RID_URL}/login/success";
      </script>
    </body>
  </html>
`);

  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async delete(@Request() req) {
    return await this.authService.delete(req.user.userId);
  }
}
