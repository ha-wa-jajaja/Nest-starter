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
  role: 'intern' | 'employee' | 'boss';
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
