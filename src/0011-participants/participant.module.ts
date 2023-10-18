import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Participant0011 } from './participant.model';

import { ParticipantService0011 } from './participant.service';

@Module({
  controllers: [],
  providers: [ParticipantService0011],
  imports: [SequelizeModule.forFeature([Participant0011])],
  exports: [ParticipantService0011],
})
export class ParticipantModule0011 {}
