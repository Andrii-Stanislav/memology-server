import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// db models
import { User } from '../modules/users/users.model';
import { Meme } from '../modules/memes/memes.model';
import { Situation } from '../modules/situations/situations.model';
import { Game } from '../modules/games/games.model';
import { Player } from '../modules/players/players.model';
import { Deal } from '../modules/deals/deals.model';
import { Bet } from '../modules/bets/bets.model';

export const AppConfigsModules = [
  ConfigModule.forRoot(),
  SequelizeModule.forRoot({
    dialect: 'postgres',
    uri: process.env.PG_DB_URI,
    models: [User, Meme, Situation, Game, Player, Deal, Bet],
    autoLoadModels: true,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, 'static'),
  }),
];
