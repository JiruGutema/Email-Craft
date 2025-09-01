import { Injectable } from '@nestjs/common';
import { CreateAuthDto, SignupUserDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Sign } from 'crypto';

@Injectable()
export class AuthService {
  constructor (
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  
  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;
    const user = await this.validateUser(username, password);

    if (!user) {
      return { message: 'Invalid username or password' };
    }

    const payload = { username: user.username, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    return { message: 'logged in successfully', accessToken: token, user };
  }

  async me(username: string) {
    return this.usersService.findOne(username);
  }

  async signup(signupUserDto: SignupUserDto) {
    return this.usersService.create(signupUserDto);
  }
}