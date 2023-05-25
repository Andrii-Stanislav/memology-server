import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { BetsService } from '../bets/bets.service';
import { CreateBetDto } from '../bets/dto';

import { Player } from './players.model';
import { CreatePlayerDto, UpdatePlayerDto } from './dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player) private playersRepository: typeof Player,
    private readonly betsService: BetsService,
  ) {}

  async getAllPlayers() {
    return await this.playersRepository.findAll();
  }

  async getGamePlayers(gameId: number) {
    return await this.playersRepository.findAll({ where: { gameId } });
  }

  async getPlayerById(id: number) {
    return await this.playersRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async createPlayer(dto: CreatePlayerDto) {
    return await this.playersRepository.create(dto);
  }

  async updatePlayer(playerId: number, dto: UpdatePlayerDto) {
    await this.playersRepository.update(dto, { where: { id: playerId } });
  }

  async removePlayer(id: number) {
    return await this.playersRepository.destroy({ where: { id } });
  }

  async createBet(playerId: number, userId: number, betDto: CreateBetDto) {
    const [newBet, player] = await Promise.all([
      this.betsService.createBet(betDto, userId),
      this.getPlayerById(playerId),
    ]);

    const newCards = player.cards.filter((card) => card !== betDto.cardId);
    await this.updatePlayer(playerId, { cards: newCards });

    return newBet;
  }
}
