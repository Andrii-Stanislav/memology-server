import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { User } from '../users/users.model';

import { CamesGateway } from './games.gateway';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game } from './games.model';

@Module({
  controllers: [GamesController],
  providers: [GamesService, CamesGateway],
  imports: [
    SequelizeModule.forFeature([Game, User]),
    forwardRef(() => AuthModule),
  ],
})
export class GamesModule {}
