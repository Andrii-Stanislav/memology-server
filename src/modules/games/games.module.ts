import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { User } from '../users/users.model';
import { Deal } from '../deals/deals.model';
import { GamesToUser } from './gamesToUser.model';

import { CommonGateway } from './gateways/common.gateway';
import { CamesGateway } from './gateways/games.gateway';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game } from './games.model';

@Module({
  controllers: [GamesController],
  providers: [GamesService, CommonGateway, CamesGateway],
  imports: [
    SequelizeModule.forFeature([Game, GamesToUser, User, Deal]),
    forwardRef(() => AuthModule),
  ],
})
export class GamesModule {}
