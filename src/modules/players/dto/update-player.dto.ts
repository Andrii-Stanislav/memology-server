import { IsString, IsEnum, IsOptional } from 'class-validator';

import { PLAYER_STATUS } from '../../../types/game';

export class UpdatePlayerDto {
  @IsString({ message: 'Player name have to be string' })
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly cards?: string;

  @IsString()
  @IsEnum(PLAYER_STATUS)
  @IsOptional()
  readonly status?: string;
}
