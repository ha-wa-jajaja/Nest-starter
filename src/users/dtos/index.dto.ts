import type { Role } from '../types';
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsInt, IsIn, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  age: number;

  @IsIn(['intern', 'employee', 'boss'], {
    message: 'Role invalid',
  })
  role: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
