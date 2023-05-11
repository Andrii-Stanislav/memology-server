import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Game } from './games.model';
import { GamesToUser } from './gamesToUser.model';
import { CreateGameDto } from './dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game) private gameRepository: typeof Game,
    @InjectModel(GamesToUser) private gamesToUserRepository: typeof GamesToUser,
  ) {}

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

  async joinToGame(joinCode: string, userId: number) {
    const game = await this.gameRepository.findOne({
      where: { joinCode },
      include: { all: true },
    });

    if (!game) {
      throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
    }

    const gamesToUser = await this.gamesToUserRepository.create({
      userId,
      gameId: game.id,
    });

    return gamesToUser;
  }
}
