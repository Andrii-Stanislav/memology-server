import { IsNumber } from 'class-validator';

export class CreateDealDto {
  @IsNumber()
  readonly gameId: number;

  @IsNumber()
  readonly judgeId: number;
}
