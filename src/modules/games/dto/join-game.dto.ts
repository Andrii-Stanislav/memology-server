import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class JoinGameDto {
  @ApiProperty({
    example: '123456',
    description: 'Not very secret code for join to game',
  })
  @IsString({ message: 'Join code have to be string' })
  @Length(6)
  readonly joinCode: string;
}
