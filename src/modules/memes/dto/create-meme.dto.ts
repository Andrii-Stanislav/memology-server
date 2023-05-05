import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMemeDto {
  @ApiProperty({ example: 'Some fanny title', description: 'Title' })
  @IsString({ message: 'Meme title have to be string' })
  readonly title: string;

  @ApiProperty({ example: 'Qweqwe', description: 'Description' })
  @IsString({ message: 'Meme description have to be string' })
  readonly description: string;

  @ApiProperty({ example: 'qwe.png', description: 'Image file' })
  readonly image: Express.Multer.File;
}
