import { IsArray, IsString, IsNumber } from 'class-validator';

export class CreatePlayerDto {
  @IsString({ message: 'Player name have to be string' })
  readonly name: string;

  @IsArray()
  readonly cards: number[];

  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly gameId: number;
}
