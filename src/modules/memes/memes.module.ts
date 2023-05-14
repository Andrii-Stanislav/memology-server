import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';

import { MemesController } from './memes.controller';
import { MemesService } from './memes.service';
import { Meme } from './memes.model';

@Module({
  controllers: [MemesController],
  providers: [MemesService],
  imports: [
    SequelizeModule.forFeature([Meme]),
    FilesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [MemesService],
})
export class MemesModule {}
