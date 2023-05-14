import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  Length,
  MinLength,
  MaxLength,
} from 'class-validator';

export class JoinGameDto {
  @ApiProperty({
    example: 123456,
    description: 'Game ID',
  })
  @IsNumber()
  readonly gameId: number;

  @ApiProperty({
    example: '123456',
    description: 'Not very secret code for join to game',
  })
  @IsString({ message: 'Join code have to be string' })
  @Length(6)
  readonly joinCode: string;

  @ApiProperty({
    example: "Your mom's boyfriend",
    description: 'Player name in current game',
  })
  @IsString({ message: 'Player name have to be string' })
  @MinLength(3)
  @MaxLength(30)
  readonly playerName: string;
}
