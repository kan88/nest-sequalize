import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWorkDto } from './dto/create-work.dto';
import { DeleteWorkDatabaseDto } from './dto/delete-work-database.dto';
import { Work } from './works.model';
import { UpdateVisibleWorksDto } from './dto/update-visible-works.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { CreateWorkDatabaseDto } from './dto/create-work-database.dto';

@Injectable()
export class WorksService {
  constructor(@InjectModel(Work) private workRepository: typeof Work) {}
  async createWork(dto: CreateWorkDatabaseDto) {
    const work = await this.workRepository.create(dto);
    return work;
  }

  async updateWork(id: number, dto: UpdateWorkDto) {
    const work = await this.workRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return work;
  }

  async updateVisible(profile_id: number, dto: UpdateVisibleWorksDto) {
    const work = await this.workRepository.update(dto, {
      where: {
        profile_id,
      },
      returning: true,
    });
    return work;
  }

  async deleteWork(id: number, dto: DeleteWorkDatabaseDto) {
    const work = await this.workRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return work;
  }
}
