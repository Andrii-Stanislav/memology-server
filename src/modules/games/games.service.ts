import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Game } from './games.model';
import { CreateGameDto } from './dto';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game) private gameRepository: typeof Game) {}

  async getAllGames() {
    const games = await this.gameRepository.findAll({ include: { all: true } });
    return games;
  }

  async createGame(dto: CreateGameDto, creatorId: number) {
    const game = await this.gameRepository.create({
      ...dto,
      creatorId,
    });
    return game;
  }
}
