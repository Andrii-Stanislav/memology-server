import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { FilesService } from '../files/files.service';

import { Meme } from './memes.model';
import { CreateMemeDto, CreateMemeExternalDto } from './dto';

@Injectable()
export class MemesService {
  constructor(
    @InjectModel(Meme) private memeRepository: typeof Meme,
    private fileService: FilesService,
  ) {}

  async getAllMemes() {
    const memes = await this.memeRepository.findAll({ include: { all: true } });
    return memes;
  }

  async getMemeById(id: number) {
    const oneMeme = await this.memeRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return oneMeme;
  }

  async createMeme(dto: CreateMemeDto, image: Express.Multer.File) {
    const fileName = await this.fileService.createFile(image);
    const meme = await this.memeRepository.create({
      ...dto,
      image: fileName,
    });
    return meme;
  }

  async createMemeWithExternalImage(dto: CreateMemeExternalDto) {
    const meme = await this.memeRepository.create(dto);
    return meme;
  }
}
