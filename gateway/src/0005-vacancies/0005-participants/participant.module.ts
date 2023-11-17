import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Participant } from './participant.model';
import { ParticipantService } from './participant.service';

@Module({
  providers: [ParticipantService],
  controllers: [],
  imports: [SequelizeModule.forFeature([Participant])],
  exports: [ParticipantService],
})
export class ParticipantModule {}
