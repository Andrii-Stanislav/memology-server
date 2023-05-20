import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ example: 'Super puper title', description: 'Game title' })
  @IsString({ message: 'Meme title have to be string' })
  readonly title: string;

  @ApiProperty({ example: 4, description: 'Game players count' })
  @IsNumber()
  @IsOptional()
  readonly playersCount?: number;

  @ApiProperty({ example: 20, description: 'Total cards per user' })
  @IsNumber()
  readonly totalCardsPerUser?: number;

  @ApiProperty({ example: 5, description: 'Cards on hands' })
  @IsNumber()
  @IsOptional()
  readonly cardsOnHands?: number;
}
