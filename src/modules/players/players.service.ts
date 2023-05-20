import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Player } from './players.model';
import { CreatePlayerDto, UpdatePlayerDto } from './dto';

@Injectable()
export class PlayersService {
  constructor(@InjectModel(Player) private playersRepository: typeof Player) {}

  async getAllPlayers() {
    return await this.playersRepository.findAll({ include: { all: true } });
  }

  async getGamePlayers(gameId: number) {
    return await this.playersRepository.findAll({
      where: { gameId },
      include: { all: true },
    });
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
}
