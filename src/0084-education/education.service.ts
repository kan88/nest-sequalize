import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEducationDto } from './dto/create-education.dto';
import { Education } from './education.model';
import { UpdateVisibleEducationsDto } from './dto/update-visible-educations.dto';
import { DeleteEducationDatabaseDto } from './dto/delete-education-database.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { CreateEducationDatabaseDto } from './dto/create-education-database.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(Education) private educationRepository: typeof Education,
  ) {}
  async createEducation(dto: CreateEducationDatabaseDto) {
    const document = await this.educationRepository.create(dto);
    return document;
  }

  async updateEducation(id: number, dto: UpdateEducationDto) {
    const document = await this.educationRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return document;
  }

  async updateVisible(profile_id: number, dto: UpdateVisibleEducationsDto) {
    const document = await this.educationRepository.update(dto, {
      where: {
        profile_id,
      },
      returning: true,
    });
    return document;
  }

  async deleteEducation(id: number, dto: DeleteEducationDatabaseDto) {
    const document = await this.educationRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return document;
  }
}
