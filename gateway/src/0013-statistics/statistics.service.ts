import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VisitsService } from './0013-visits/visits.service';
import { Statistic } from './statistics.model';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Statistic) private statisticRepository: typeof Statistic,
    private visitService: VisitsService,
  ) {}
  async getToday() {
    const data = await this.statisticRepository.findOrCreate({
      where: { date: new Date() },
    });
    return data;
  }

  async post({ ip_address, ip_url, ip_user }) {
    const today = await this.getToday();
    const count = await this.visitService.getCount(ip_address);
    if (count > 0) {
      this.incrementViews();
    } else {
      this.incrementHosts();
      this.incrementViews();
    }

    const data = await this.visitService.post(
      {
        ip_address,
        ip_url,
        ip_user,
      },
      today,
    );
    return data;
  }

  async getLastFifty() {
    const data = await this.statisticRepository.findAll({
      limit: 50,
      include: [{ all: true }],
    });
    return data;
  }

  async incrementHosts() {
    const data = await this.statisticRepository.findOne({
      where: { date: new Date() },
    });
    const dataUpdate = data.increment('hosts');
    return dataUpdate;
  }

  async incrementViews() {
    const data = await this.statisticRepository.findOne({
      where: { date: new Date() },
    });
    const dataUpdate = data.increment('views');
    return dataUpdate;
  }
}
