import { IsNumber, IsOptional, IsEnum } from 'class-validator';

import { DEAL_STATUS } from '../../../types/game';

export class UpdateDealDto {
  @IsNumber()
  @IsOptional()
  readonly vinnerId?: number;

  @IsEnum(DEAL_STATUS)
  @IsOptional()
  readonly status?: DEAL_STATUS;
}
