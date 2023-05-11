import { Module } from '@nestjs/common';

// config
import { AppConfigsModules } from './configs';

// module
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MemesModule } from './modules/memes/memes.module';
import { FilesModule } from './modules/files/files.module';
import { GamesModule } from './modules/games/games.module';
import { DealsModule } from './modules/deals/deals.module';

@Module({
  imports: [
    ...AppConfigsModules,
    UsersModule,
    AuthModule,
    MemesModule,
    FilesModule,
    GamesModule,
    DealsModule,
  ],
})
export class AppModule {}
