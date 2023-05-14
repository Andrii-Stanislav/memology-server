import { IsString, IsNumber } from 'class-validator';

export class CreatePlayerDto {
  @IsString({ message: 'Player name have to be string' })
  readonly name: string;

  @IsString()
  readonly cards: string;

  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly gameId: number;
}
