import { Module } from '@nestjs/common';

// config
import { AppConfigsModules } from './configs';

// module
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MemesModule } from './modules/memes/memes.module';
import { SituationsModule } from './modules/situations/situations.module';
import { FilesModule } from './modules/files/files.module';
import { GamesModule } from './modules/games/games.module';
import { PlayersModule } from './modules/players/players.module';
import { DealsModule } from './modules/deals/deals.module';
import { BetsModule } from './modules/bets/bets.module';

@Module({
  imports: [
    ...AppConfigsModules,
    UsersModule,
    AuthModule,
    MemesModule,
    SituationsModule,
    FilesModule,
    GamesModule,
    PlayersModule,
    DealsModule,
    BetsModule,
  ],
})
export class AppModule {}
