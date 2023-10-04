import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Participant } from './participant.model';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { RemoveParticipantDto } from './dto/remove-participant.dto';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel(Participant) private vacancyRepository: typeof Participant,
  ) {}

  async createParticipant(dto: CreateParticipantDto) {
    const vacancy = await this.vacancyRepository.create(dto);
    return vacancy;
  }

  async updateParticipant(dto: UpdateParticipantDto, id_request: number) {
    const vacancy = await this.vacancyRepository.update(dto, {
      where: {
        id_request,
      },
    });
    return vacancy;
  }

  async removeParticipant(dto: RemoveParticipantDto, id_request: number) {
    const vacancy = await this.vacancyRepository.update(dto, {
      where: {
        id_request,
      },
    });
    return vacancy;
  }
}
