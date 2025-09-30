import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto, SignupUserDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor (
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
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
    return { message: 'logged in successfully', accessToken: token, user: { id: user.id, username: user.username, email: user.email, name: user.name, picture: user.picture } };
  }

  async me(username: string) {
    const user =  await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
      return;
    }
    return { id: user.id, username: user.username, email: user.email, name: user.name, picture: user.picture };
  }

  async signup(signupUserDto: SignupUserDto) {
    const user = await this.usersService.create(signupUserDto);
    if (!user) {
      return { message: 'User with this email or username already exists' };
    }
    return { message: 'User created successfully', user: { id: user.id, username: user.username, email: user.email, name: user.name, picture: user.picture } };
  }

  async delete(userId: string) {
    const deletedUser =  await this.usersService.delete(userId);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }


  async logout(userId: string) {
    const res = await this.usersService.logout(userId);

    if (!res) {
      throw new NotFoundException('User not found');
    }
    return { message: 'Logged out successfully' };
  }
}