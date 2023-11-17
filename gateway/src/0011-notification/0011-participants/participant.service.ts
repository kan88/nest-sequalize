import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Participant0011 } from './participant.model';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

interface IParticipant extends CreateParticipantDto {
  chats_id: number;
}

@Injectable()
export class ParticipantService0011 {
  constructor(
    @InjectModel(Participant0011)
    private participantsRepository: typeof Participant0011,
  ) {}
  async create({ account_number, chats_id, full_name }: IParticipant) {
    const data = await this.participantsRepository.findOrCreate({
      where: {
        chats_id,
        account_number,
        full_name,
        status: true,
      },
    });
    return data;
  }

  async getParticipants(chats_id: number) {
    const data = await this.participantsRepository.findAll({
      where: {
        chats_id,
        status: true,
      },
    });
    return data;
  }

  async findActualChats(account_number: string) {
    const data = await this.participantsRepository.findAll({
      attributes: [
        [Sequelize.fn('array_agg', Sequelize.col('chats_id')), 'chats_id'],
      ],
      where: {
        account_number,
        status: true,
      },
      raw: true,
    });
    return data;
  }
  async remove(id: number) {
    const data = await this.participantsRepository.update(
      { status: false },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
    return data;
  }

  async updateLastVisitUnreaded(chats_id: number, participant: string) {
    const data = await this.participantsRepository.update(
      { unread_messages: 0, last_visit: Sequelize.fn('NOW') },
      {
        where: {
          chats_id,
          account_number: participant,
        },
        returning: true,
      },
    );
    return data;
  }

  async increment(chats_id: number, account_number: string) {
    const data = await this.participantsRepository.findAll({
      where: { chats_id, account_number: { [Op.ne]: account_number } },
    });
    const dataUpdate = data.map((participant) =>
      participant.increment('unread_messages'),
    );
    return dataUpdate;
  }
}
