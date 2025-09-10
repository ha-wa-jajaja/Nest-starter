import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dtos/index.dto';
import { ValidationPipe } from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

// NOTE: Controllers are endpoint definition classes and handlers
@SkipThrottle() // NOTE: Skip rate limiting for all endpoints in this controller
@Controller('users')
export class UsersController {
  // NOTE: Dependency Injection via constructor; UsersService is injected, we're able
  // to use its methods to handle requests
  constructor(private readonly usersService: UsersService) {}

  @SkipThrottle({ default: false }) // NOTE: Keep rate limiting for this specific endpoint
  @Get() // GET /users?role=string
  findAll(@Query('role') role?: 'intern' | 'employee' | 'boss') {
    return this.usersService.findAll(role);
  }

  @Throttle({ demo: { ttl: 10000, limit: 1 } }) // NOTE: Custom rate limiting for this specific endpoint
  @Get('interns') // GET /users/interns
  findInterns() {
    return this.usersService.findInterns();
  }

  @Get(':id') // GET /users/:id
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }
  // NOTE: With pipes, we can transform and validate incoming data
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // NOTE: This cannot be here, cuz the previous endpoint already gets the id param,
  // so the passed value will be treated as an id
  // @Get('interns') // GET /users/interns
  // findInterns() {
  //   return 'This action returns all interns';
  // }

  @Post() // POST /users
  create(@Body(ValidationPipe) user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) user: UpdateUserDto,
  ) {
    return this.usersService.update(id, user);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
