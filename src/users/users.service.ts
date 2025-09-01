import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {PrismaClient } from '@prisma/client';
import { SignupUserDto } from 'src/auth/dto/create-auth.dto';
const Prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async create(signupUserDto: SignupUserDto) {
    const new_user = signupUserDto;
    const existingUser = await Prisma.users.findMany({
      where: {
        OR: [
          { email: new_user.email },
          { username: new_user.username },
        ],
      },
    });

    if (existingUser.length > 0) {
      return {message: 'User with this email or username already exists'};
    }
    const createdUser = await Prisma.users.create({
      data: new_user,
    });
    return {message: 'User created successfully', user: createdUser};
  }

 async findAll() {
    return await Prisma.users.findMany();
  }

 async findOne(id: string) {
    const user = await Prisma.users.findUnique({
      where: { id },
    });
    if (!user){
      return null;
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await Prisma.users.findUnique({
      where: { id },
    });
    if (!user) {
      return { message: `User with id ${id} not found` };
    }
    const updatedUser = await Prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
    
    return { message: 'User updated successfully', user: updatedUser };
  }

  async delete(id: string) {
    const user = await Prisma.users.findUnique({
      where: { id },
    });
    if (!user) {
      return { message: `User with id ${id} not found` };
    }
    await Prisma.users.delete({
      where: { id },
    });
    return { message: 'User deleted successfully' };
  }
  async findOrCreateUser(profile: any) {
    const { email, name, picture } = profile._json;

    let user = await Prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      const username = email.split('@')[0];
      const password = "_google_oauth_user_";
      user = await Prisma.users.create({
        data: {
          email,
          name,
          password,
          picture,
          username,
        },
      });
    }

    return {user: {id: user.id, email: user.email, name: user.name, picture: user.picture}};
  }
}
