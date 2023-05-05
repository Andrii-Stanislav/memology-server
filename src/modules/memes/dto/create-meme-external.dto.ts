import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMemeExternalDto {
  @ApiProperty({ example: 'Some fanny title', description: 'Title' })
  @IsString({ message: 'Meme title have to be string' })
  readonly title: string;

  @ApiProperty({ example: 'Qweqwe', description: 'Description' })
  @IsString({ message: 'Meme description have to be string' })
  readonly description: string;

  @ApiProperty({ example: 'https://qwe.png', description: 'Image path' })
  readonly image: string;
}
