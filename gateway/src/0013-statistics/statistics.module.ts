import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { Statistic } from './statistics.model';
import { Visit } from './0013-visits/visits.model';
import { VisitsModule } from './0013-visits/visits.module';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  imports: [SequelizeModule.forFeature([Statistic, Visit]), VisitsModule],

  exports: [],
})
export class StatisticsModule {}
