import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length,
  IsEmail,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'qweqwe@gmail.com', description: 'User email' })
  @IsOptional()
  @IsString({ message: 'User email have to be string' })
  @IsEmail({}, { message: 'Email is invalid' })
  @ApiProperty({ example: 'qweqwe@gmail.com', description: 'User email' })
  readonly email?: string;

  @ApiProperty({ example: 'asd123', description: 'Password' })
  @IsOptional()
  @Length(5, 50, {
    message: 'Password have to be between 8 and 50 characters',
  })
  readonly password?: string;

  @ApiProperty({ example: true, description: 'Set is banned' })
  @IsOptional()
  @IsBoolean()
  readonly banned?: boolean;

  @ApiProperty({ example: 'Bad boy', description: 'Ban reason' })
  @IsOptional()
  @IsString({ message: 'Ban reason have to be string' })
  readonly banReason?: string;
}
