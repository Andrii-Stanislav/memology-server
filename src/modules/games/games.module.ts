import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from '../users/users.model';
import { Deal } from '../deals/deals.model';
import { Bet } from '../bets/bets.model';
import { Player } from '../players/players.model';
import { AuthModule } from '../auth/auth.module';
import { MemesModule } from '../memes/memes.module';
import { SituationsModule } from '../situations/situations.module';
import { PlayersModule } from '../players/players.module';
import { DealsModule } from '../deals/deals.module';
import { BetsModule } from '../bets/bets.module';

import { CommonGateway } from './gateways/common.gateway';
import { CamesGateway } from './gateways/games.gateway';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game } from './games.model';

@Module({
  controllers: [GamesController],
  providers: [GamesService, CommonGateway, CamesGateway],
  imports: [
    SequelizeModule.forFeature([Game, Player, User, Deal, Bet]),
    forwardRef(() => AuthModule),
    MemesModule,
    SituationsModule,
    PlayersModule,
    DealsModule,
    BetsModule,
  ],
})
export class GamesModule {}
