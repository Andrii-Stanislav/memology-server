import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Game } from '../games/games.model';

import { DealsService } from './deals.service';
import { Deal } from './deals.model';

@Module({
  providers: [DealsService],
  imports: [SequelizeModule.forFeature([Deal, Game])],
})
export class DealsModule {}
