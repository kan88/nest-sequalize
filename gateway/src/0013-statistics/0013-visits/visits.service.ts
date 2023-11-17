import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Statistic } from 'src/0013-statistics/statistics.model';
import { IVisit, Visit } from './visits.model';

@Injectable()
export class VisitsService {
  constructor(@InjectModel(Visit) private visitRepository: typeof Visit) {}

  async getCount(ip_address: string) {
    const count = await this.visitRepository.count({
      where: {
        ip_address,
        date: new Date(),
      },
    });
    return count;
  }

  async post(dto: IVisit, today: [Statistic, boolean]) {
    const data = await this.visitRepository.create({
      ...dto,
      statistics_id: today[0].id,
    });
    return data;
  }
}
