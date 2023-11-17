import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Alert } from './alert.model';
import { CreateAlertDto } from './dto/create-alert.dto';

@Injectable()
export class AlertService {
  constructor(@InjectModel(Alert) private alertsRepository: typeof Alert) {}

  async create(dto: CreateAlertDto) {
    const data = await this.alertsRepository.create(dto);
    return data;
  }

  async getByAccount(samaccountname: string) {
    const data = await this.alertsRepository.findAll({
      where: {
        account_number: samaccountname,
      },
      limit: 30,
    });
    return data;
  }
  async getNewByAccount(samaccountname: string) {
    const data = await this.alertsRepository.findAll({
      where: {
        account_number: samaccountname,
        alert_is_view: false,
      },
      limit: 10,
    });
    return data;
  }

  async updateByAccount(samaccountname: string) {
    const data = await this.alertsRepository.update(
      { alert_is_view: true },
      {
        where: {
          account_number: samaccountname,
          alert_is_view: false,
        },
        returning: true,
      },
    );
    return data;
  }
}
