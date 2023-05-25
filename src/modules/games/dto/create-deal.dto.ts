import { IsNumber } from 'class-validator';

export class CreateDeaDto {
  @IsNumber()
  readonly judgeId: number;
}
