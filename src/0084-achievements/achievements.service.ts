import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { DeleteAchievementDatabaseDto } from './dto/delete-achievement-database.dto';
import { Achievement } from './achievements.model';
import { UpdateVisibleAchievementsDto } from './dto/update-visible-achievements.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Op } from 'sequelize';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectModel(Achievement) private achievementRepository: typeof Achievement,
  ) {}
  async createAchievement(dto: CreateAchievementDto) {
    const achievement = await this.achievementRepository.create(dto);
    return achievement;
  }

  async updateAchievement(id: number, dto: UpdateAchievementDto) {
    const achievement = await this.achievementRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return achievement;
  }

  async updateVisible(dto: UpdateVisibleAchievementsDto) {
    const achievement = await this.achievementRepository.update(dto, {
      where: {
        [Op.and]: [{ profile_id: dto.profile_id }, { kind: dto.kind }],
      },
      returning: true,
    });
    return achievement;
  }

  async deleteAchievement(id: number, dto: DeleteAchievementDatabaseDto) {
    const achievement = await this.achievementRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return achievement;
  }
}
