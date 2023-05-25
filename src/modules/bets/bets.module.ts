import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { Deal } from '../deals/deals.model';

import { BetsService } from './bets.service';
import { Bet } from './bets.model';

@Module({
  providers: [BetsService],
  imports: [
    SequelizeModule.forFeature([Bet, Deal]),
    forwardRef(() => AuthModule),
  ],
  exports: [BetsService],
})
export class BetsModule {}
