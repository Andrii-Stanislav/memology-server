import { IsArray, IsString, IsEnum, IsOptional } from 'class-validator';

import { PLAYER_STATUS } from '../../../types/game';

export class UpdatePlayerDto {
  @IsString({ message: 'Player name have to be string' })
  @IsOptional()
  readonly name?: string;

  @IsArray()
  @IsOptional()
  readonly cards?: number[];

  @IsString()
  @IsEnum(PLAYER_STATUS)
  @IsOptional()
  readonly status?: string;
}
