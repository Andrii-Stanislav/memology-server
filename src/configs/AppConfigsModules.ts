import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// db models
import { User } from '../modules/users/users.model';
import { Meme } from '../modules/memes/memes.model';
import { Game } from '../modules/games/games.model';

export const AppConfigsModules = [
  ConfigModule.forRoot(),
  SequelizeModule.forRoot({
    dialect: 'postgres',
    uri: process.env.PG_DB_URI,
    models: [User, Meme, Game],
    autoLoadModels: true,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, 'static'),
  }),
];
