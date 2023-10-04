import { Module } from '@nestjs/common';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './participant.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vacancy } from './participant.model';
import { Role } from 'src/0000-roles/administrator.model';
import { RolesModule } from 'src/0000-roles/administrator.module';

@Module({
  providers: [VacancyService],
  controllers: [VacancyController],
  imports: [SequelizeModule.forFeature([Vacancy, Role]), RolesModule],
})
export class VacancyModule {}
