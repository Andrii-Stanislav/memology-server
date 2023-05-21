import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Deal } from '../deals/deals.model';

import { BetsService } from './bets.service';
import { Bet } from './bets.model';

@Module({
  providers: [BetsService],
  imports: [SequelizeModule.forFeature([Bet, Deal])],
  exports: [BetsService],
})
export class BetsModule {}
