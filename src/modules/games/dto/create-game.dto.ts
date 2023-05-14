import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ example: 'Super puper title', description: 'Game title' })
  @IsString({ message: 'Meme title have to be string' })
  readonly title: string;

  @ApiProperty({ example: 4, description: 'Game players count' })
  @IsNumber()
  readonly playersCount?: number = 4;

  @ApiProperty({ example: 20, description: 'Total cards per user' })
  @IsNumber()
  readonly totalCardsPerUser?: number = 20;

  @ApiProperty({ example: 5, description: 'Cards on hands' })
  @IsNumber()
  readonly cardsOnHands?: number = 5;
}
