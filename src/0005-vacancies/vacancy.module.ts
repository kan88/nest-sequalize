import { Module } from '@nestjs/common';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vacancy } from './vacancy.model';

@Module({
  providers: [VacancyService],
  controllers: [VacancyController],
  imports: [SequelizeModule.forFeature([Vacancy])],
})
export class VacancyModule {}
