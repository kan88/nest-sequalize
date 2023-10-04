import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Schedule } from './schedule.model';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { RemoveScheduleDto } from './dto/remove-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule) private scheduleRepository: typeof Schedule,
  ) {}

  async createSchedule(dto: CreateScheduleDto) {
    const schedule = await this.scheduleRepository.create(dto);
    return schedule;
  }

  async updateSchedule(dto: UpdateScheduleDto, id_request: number) {
    const schedule = await this.scheduleRepository.update(dto, {
      where: {
        id_request,
      },
    });
    return schedule;
  }

  async removeSchedule(dto: RemoveScheduleDto, id_request: number) {
    const schedule = await this.scheduleRepository.update(dto, {
      where: {
        id_request,
      },
    });
    return schedule;
  }
}
