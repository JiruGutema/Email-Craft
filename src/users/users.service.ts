import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from './mock/users.mock';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const new_user = createUserDto;
    const existingUser = users.find(user => user.email === new_user.email || user.username === new_user.username);
    if (existingUser) {
      return {message: 'User with this email or username already exists'};
    }
    users.push(new_user);
    return {message: 'User created successfully', user: new_user};
  }

 async findAll() {
    return users;
  }

 async findOne(username: string) {
    const user =  users.find(user => user.username === username);
    if (!user){
      return null;
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = users.findIndex(user => user.userId === id);
    if (userIndex == -1){
      return {message: `User with id ${id} not found`};
    }
    else if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updateUserDto };
    }
  }

  async remove(id: string) {
    const userIndex = users.findIndex(user => user.userId === id);
    if (userIndex == -1){
      return {message: `User with id ${id} not found`};
    }
    else if (userIndex !== -1) {
      users.splice(userIndex, 1);
    }
  }


}
