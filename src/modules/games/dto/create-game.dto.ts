import { IsString } from 'class-validator';

export class CreateGameDto {
  @IsString({ message: 'Meme title have to be string' })
  readonly title: string;

  @IsString({ message: 'Meme description have to be string' })
  readonly description?: string;
}
