import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';

import { SituationsController } from './situations.controller';
import { SituationsService } from './situations.service';
import { Situation } from './situations.model';

@Module({
  controllers: [SituationsController],
  providers: [SituationsService],
  imports: [
    SequelizeModule.forFeature([Situation]),
    FilesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [SituationsService],
})
export class SituationsModule {}
