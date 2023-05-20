import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { MemesModule } from '../memes/memes.module';
import { Game } from '../games/games.model';

import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { Player } from './players.model';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService],
  imports: [
    SequelizeModule.forFeature([Player, Game]),
    forwardRef(() => AuthModule),
    MemesModule,
  ],
  exports: [PlayersService],
})
export class PlayersModule {}
