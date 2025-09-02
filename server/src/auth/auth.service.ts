import { Injectable, NotFoundException } from '@nestjs/common';
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
    const user = await this.usersService.findOneByUsername(username);
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
    const user =  await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
      return;
    }
    return { user };
  }

  async signup(signupUserDto: SignupUserDto) {
    const user = await this.usersService.create(signupUserDto);
    if (!user) {
      return { message: 'User with this email or username already exists' };
    }
    return { message: 'User created successfully', user };
  }
}