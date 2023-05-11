import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({
    example: 'Super puper title',
    description: 'Game title',
  })
  @IsString({ message: 'Meme title have to be string' })
  readonly title: string;
}
