import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateSituationDto {
  @ApiProperty({
    example: ['Some fanny text', 'and seccond text'],
    description: 'Text',
  })
  @IsArray()
  readonly text: string[];

  @ApiProperty({ example: 'Qweqwe', description: 'Description' })
  @IsString({ message: 'Situation description have to be string' })
  readonly description?: string;
}
