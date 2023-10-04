import { Module } from '@nestjs/common';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vacancy } from './vacancy.model';
import { Role } from 'src/0000-roles/administrator.model';
import { RolesModule } from 'src/0000-roles/administrator.module';
import { Participant } from 'src/0005-participants/participant.model';
import { ParticipantModule } from 'src/0005-participants/participant.module';

@Module({
  providers: [VacancyService],
  controllers: [VacancyController],
  imports: [
    SequelizeModule.forFeature([Vacancy, Role, Participant]),
    RolesModule,
    ParticipantModule,
  ],
})
export class VacancyModule {}
