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

  async login(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;
    const user  = await this.usersService.findOne(username);
    if (!user) {
      return { message: 'Invalid username or password' };
    }

    if (user && user.password === password) {
      const payload = { username: user.username, sub: user.userId };
      const token = await this.jwtService.signAsync(payload) 
      return { message: 'logged in successfully', accessToken: token, user };
    }
    return { message: 'Invalid password' };
  }

  async me(userId: string) {
    return this.usersService.findOne(userId);
  }
}