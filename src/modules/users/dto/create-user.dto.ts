import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'qweqwe@gmail.com', description: 'User email' })
  @IsString({ message: 'User email have to be string' })
  @IsEmail({}, { message: 'Email is invalid' })
  readonly email: string;

  @ApiProperty({ example: 'asd123', description: 'Password' })
  @Length(5, 50, {
    message: 'Password have to be between 8 and 50 characters',
  })
  readonly password: string;
}
