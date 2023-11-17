import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VisitsService } from './visits.service';
import { Visit } from './visits.model';
import { Statistic } from 'src/0013-statistics/statistics.model';
import { StatisticsModule } from 'src/0013-statistics/statistics.module';

@Module({
  controllers: [],
  providers: [VisitsService],
  imports: [SequelizeModule.forFeature([Visit])],
  exports: [VisitsService],
})
export class VisitsModule {}
