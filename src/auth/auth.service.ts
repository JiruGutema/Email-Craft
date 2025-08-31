import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

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

    const payload = { username: user.username, sub: user.userId };
    const token = await this.jwtService.signAsync(payload);
    return { message: 'logged in successfully', accessToken: token, user };
  }

  async me(username: string) {
    return this.usersService.findOne(username);
  }
}