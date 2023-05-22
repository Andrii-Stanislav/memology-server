import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Bet } from './bets.model';
import { CreateBetDto } from './dto';

@Injectable()
export class BetsService {
  constructor(@InjectModel(Bet) private betsRepository: typeof Bet) {}

  async createBet(dto: CreateBetDto, userId: number) {
    return await this.betsRepository.create({ ...dto, userId });
  }
}
