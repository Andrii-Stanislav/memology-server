import { IsNumber } from 'class-validator';

export class CreateBetDto {
  @IsNumber()
  readonly dealId: number;

  @IsNumber()
  readonly playerId: number;
}
