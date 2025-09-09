import { Injectable } from '@nestjs/common';
import type { Role } from 'src/users/types';
import { CreateUserDto, UpdateUserDto } from './dtos/index.dto';
import { NotFoundException } from '@nestjs/common';

// NOTE: Providers are classes that can be injected as dependencies; they handle
// business logic and data management
@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Alice', age: 25, role: 'intern' },
    { id: 2, name: 'Bob', age: 30, role: 'employee' },
    { id: 3, name: 'Charlie', age: 22, role: 'intern' },
    { id: 4, name: 'John', age: 42, role: 'boss' },
  ];

  findAll(role?: Role) {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findInterns() {
    return this.users.filter((user) => user.role === 'intern');
  }

  findOne(id: number) {
    const res = this.users.find((user) => user.id === id);

    if (!res) {
      throw new NotFoundException('User not found');
    }

    return res;
  }

  create(user: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, user: UpdateUserDto) {
    const existingUser = this.findOne(id);
    if (!existingUser) {
      return null;
    }
    Object.assign(existingUser, user);
    return existingUser;
  }

  delete(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return null;
    }
    const deletedUser = this.users.splice(index, 1);
    return deletedUser[0];
  }
}
