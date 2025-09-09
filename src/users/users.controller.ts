import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { Role } from 'src/types';

// NOTE: Controllers are endpoint definition classes and handlers
@Controller('users')
export class UsersController {
  // NOTE: Dependency Injection via constructor; UsersService is injected, we're able
  // to use its methods to handle requests
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users?role=string
  findAll(@Query('role') role?: Role) {
    return this.usersService.findAll(role);
  }

  @Get('interns') // GET /users/interns
  findInterns() {
    return this.usersService.findInterns();
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // NOTE: This cannot be here, cuz the previous endpoint already gets the id param,
  // so the passed value will be treated as an id
  // @Get('interns') // GET /users/interns
  // findInterns() {
  //   return 'This action returns all interns';
  // }

  @Post() // POST /users
  create(@Body() user: { name: string; age: number; role: Role }) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id') id: string,
    @Body() user: { name?: string; age?: number; role?: Role },
  ) {
    return this.usersService.update(+id, user);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
