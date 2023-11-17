import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Participant } from './participant.model';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { RemoveParticipantDto } from './dto/remove-participant.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel(Participant) private vacancyRepository: typeof Participant,
  ) {}

  async createParticipant(dto: CreateParticipantDto) {
    const participant = await this.vacancyRepository.create(dto);
    return participant;
  }

  async getParticipants(account_number: string) {
    const participants = await this.vacancyRepository.findAll({
      where: {
        account_number,
        status: 0,
      },
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('id_request')), 'id_request'],
      ],
      raw: false,
    });
    return participants;
  }

  async updateParticipant(dto: UpdateParticipantDto, id: number) {
    const participant = await this.vacancyRepository.update(dto, {
      where: {
        id,
      },
    });
    return participant;
  }

  async removeParticipant(dto: RemoveParticipantDto, id: number) {
    const participant = await this.vacancyRepository.update(dto, {
      where: {
        id,
      },
    });
    return participant;
  }
}
