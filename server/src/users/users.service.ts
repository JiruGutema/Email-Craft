import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { SignupUserDto } from 'src/auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';
const Prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async create(signupUserDto: SignupUserDto) {
    const new_user = signupUserDto;
    const hashedPassword = await bcrypt.hash(new_user.password, 10);
    new_user.password = hashedPassword;
    const existingUser = await Prisma.users.findMany({
      where: {
        OR: [{ email: new_user.email }, { username: new_user.username }],
      },
    });

    if (existingUser.length > 0) {
      return null;
    }
    const createdUser = await Prisma.users.create({
      data: new_user,
    });
    return createdUser;
  }

  async findAll() {
    return await Prisma.users.findMany();
  }

  async findOneById(id: string) {
    const user = await Prisma.users.findUnique({
      where: { id },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async findOneByUsername(username: string) {
    if (!username) {
      return null;
    }
    const user = await Prisma.users.findUnique({
      where: { username },
    });
    if (!user) {
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

    return {
      message: 'User updated successfully',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        name: updatedUser.name,
        picture: updatedUser.picture,
      },
    };
  }

  async delete(userId: string) {
    const user = await Prisma.users.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return { message: `User with id ${userId} not found` };
    }
    await Prisma.users.delete({
      where: { id: userId },
    });
    return { message: 'User deleted successfully' };
  }

  async findOneByEmail(email: string) {
    return await Prisma.users.findUnique({
      where: { email },
    });
  }

  async updateGoogleTokens(
    userId: string,
    accessToken: string,
    refreshToken: string,
  ) {
    if (!userId || !accessToken) {
      return null;
    }
    await Prisma.users.update({
      where: { id: userId },
      data: {
        googleAccessToken: accessToken,
        googleRefreshToken: refreshToken,
      },
    });
  }
  async logout(userId: string) {
    if (!userId) {
      return null;
    }
    const res = await Prisma.users.update({
      where: { id: userId },
      data: {
        googleAccessToken: null,
        googleRefreshToken: null,
      },
    });
  }
}
