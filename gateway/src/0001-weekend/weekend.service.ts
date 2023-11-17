import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Weekend } from './weekend.model';
import { CreateWeekendDto } from './dto/create-weekend.dto';
import { UpdateWeekendDto } from './dto/update-weekend.dto';
import { DeclineWeekendDto } from './dto/decline-weekend.dto';

@Injectable()
export class WeekendService {
  constructor(
    @InjectModel(Weekend) private weekendRepository: typeof Weekend,
  ) {}

  async create(dto: CreateWeekendDto) {
    const data = await this.weekendRepository.create(dto);
    return data;
  }

  async getData(status = '0', limit = 6, offset = 0) {
    const data = await this.weekendRepository.findAndCountAll({
      where: { status },
      order: [['id', 'DESC']],
      limit: limit > 50 ? 50 : limit,
      offset,
      include: { all: true, separate: true },
    });
    return data;
  }

  async update(dto: UpdateWeekendDto, id: number) {
    const data = await this.weekendRepository.update(dto, { where: { id } });
    if (data && dto.status == '2' && dto.freedate) {
      await this.create({
        hotel: dto.hotel,
        house: dto.house,
        dates: dto.freedate,
        room: dto.room,
        half: '1',
        hot: dto.hot,
      });
    }
    data ? data : 'К сожалению Вас кто-то опередил';
  }

  async decline(dto: DeclineWeekendDto, id: number) {
    const data = await this.weekendRepository.update(
      { status: '3', reject_reason: dto.reject_reason },
      { where: { id } },
    );
    if (dto.status == '3' && data) {
      await this.create({
        hotel: dto.hotel,
        house: dto.house,
        dates: dto.dates,
        room: dto.room,
        half: dto.half,
        hot: dto.hot,
      });
    }
    return data;
  }

  async remove(id: number) {
    const data = await this.weekendRepository.update(
      { status: '4' },
      { where: { id } },
    );
    return data;
  }
}
