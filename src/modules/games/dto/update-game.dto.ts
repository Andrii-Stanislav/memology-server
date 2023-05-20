import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';

import { GAME_STATUS } from '../../../types/game';

export class UpdateGameDto {
  @ApiProperty({ example: 'Super puper title', description: 'Game title' })
  @IsString({ message: 'Meme title have to be string' })
  @IsOptional()
  readonly title?: string;

  @ApiProperty({ example: 4, description: 'Game players count' })
  @IsNumber()
  @IsOptional()
  readonly playersCount?: number;

  @ApiProperty({ example: 20, description: 'Total cards per user' })
  @IsNumber()
  @IsOptional()
  readonly totalCardsPerUser?: number;

  @ApiProperty({ example: 5, description: 'Cards on hands' })
  @IsNumber()
  @IsOptional()
  readonly cardsOnHands?: number;

  @ApiProperty({ example: GAME_STATUS.STARTED, description: 'Game status' })
  @IsEnum(GAME_STATUS)
  @IsOptional()
  readonly status?: GAME_STATUS;
}
