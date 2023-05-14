import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { User } from '../users/users.model';
import { Deal } from '../deals/deals.model';
import { MemesModule } from '../memes/memes.module';

import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { Player } from './players.model';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService],
  imports: [
    SequelizeModule.forFeature([Player, User, Deal]),
    forwardRef(() => AuthModule),
    MemesModule,
  ],
  exports: [PlayersService],
})
export class PlayersModule {}
