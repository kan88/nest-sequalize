import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Schedule } from './schedule.model';
import { ScheduleService } from './schedule.service';

@Module({
  providers: [ScheduleService],
  imports: [SequelizeModule.forFeature([Schedule])],
  exports: [ScheduleService],
})
export class ScheduleModule {}
