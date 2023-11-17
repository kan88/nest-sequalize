import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WeekendController } from './weekend.controller';
import { Weekend } from './weekend.model';

import { WeekendService } from './weekend.service';

@Module({
  controllers: [WeekendController],
  providers: [WeekendService],
  imports: [SequelizeModule.forFeature([Weekend])],
  exports: [],
})
export class WeekendsModule {}
