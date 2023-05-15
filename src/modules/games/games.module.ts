import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { User } from '../users/users.model';
import { Deal } from '../deals/deals.model';
import { Player } from '../players/players.model';
import { MemesModule } from '../memes/memes.module';
import { PlayersModule } from '../players/players.module';

import { CamesGateway } from './gateways/games.gateway';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game } from './games.model';

@Module({
  controllers: [GamesController],
  providers: [GamesService, CamesGateway],
  imports: [
    SequelizeModule.forFeature([Game, Player, User, Deal]),
    forwardRef(() => AuthModule),
    MemesModule,
    PlayersModule,
  ],
})
export class GamesModule {}
