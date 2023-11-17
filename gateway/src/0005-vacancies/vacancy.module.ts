import { Module } from '@nestjs/common';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vacancy } from './vacancy.model';
import { Role } from 'src/0000-roles/administrator.model';
import { RolesModule } from 'src/0000-roles/administrator.module';
import { Participant } from './0005-participants/participant.model';
import { Address } from './0005-addresses/address.model';
import { Schedule } from './0005-schedules/schedule.model';
import { ParticipantModule } from './0005-participants/participant.module';
import { AddressModule } from './0005-addresses/address.module';
import { ScheduleModule } from './0005-schedules/schedule.module';
import { Candidate } from './0005-candidates/candidate.model';
import { CandidateService } from './0005-candidates/candidate.service';
import { CandidateModule } from './0005-candidates/candidate.module';

@Module({
  providers: [VacancyService],
  controllers: [VacancyController],
  imports: [
    SequelizeModule.forFeature([
      Vacancy,
      Role,
      Participant,
      Address,
      Schedule,
      Candidate,
    ]),
    RolesModule,
    ParticipantModule,
    AddressModule,
    ScheduleModule,
    CandidateModule,
  ],
})
export class VacancyModule {}
