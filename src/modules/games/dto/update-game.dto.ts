import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsEnum, IsNumber } from 'class-validator';

import { GAME_STATUS } from '../../../types/game';

export class UpdateGameDto {
  @ApiProperty({ example: 123, description: 'Current deal ID' })
  @IsNumber()
  @IsOptional()
  readonly currentDealId?: number;

  @ApiProperty({ example: GAME_STATUS.STARTED, description: 'Game status' })
  @IsEnum(GAME_STATUS)
  @IsOptional()
  readonly status?: GAME_STATUS;

  @ApiProperty({ example: [5, 6, 97], description: 'Card ID array' })
  @IsArray()
  @IsOptional()
  readonly cards?: number[];

  @ApiProperty({ example: [5, 6, 97], description: 'Situations ID array' })
  @IsArray()
  @IsOptional()
  readonly situations?: number[];
}
