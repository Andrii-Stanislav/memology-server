import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { Game } from '../games/games.model';
import { Bet } from '../bets/bets.model';

import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { Deal } from './deals.model';

@Module({
  controllers: [DealsController],
  providers: [DealsService],
  imports: [
    SequelizeModule.forFeature([Deal, Game, Bet]),
    forwardRef(() => AuthModule),
  ],
  exports: [DealsService],
})
export class DealsModule {}
