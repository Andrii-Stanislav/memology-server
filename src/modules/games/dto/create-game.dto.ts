import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ example: 'Super puper title', description: 'Game title' })
  @IsString({ message: 'Meme title have to be string' })
  readonly title: string;

  @ApiProperty({ example: 3, description: 'Game players count' })
  @IsNumber()
  readonly playersCount: number;

  @ApiProperty({ example: 7, description: 'Total deals count' })
  @IsNumber()
  readonly dealsCount: number;

  @ApiProperty({ example: 5, description: 'Cards on hands' })
  @IsNumber()
  readonly cardsOnHands: number;
}
