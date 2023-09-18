import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Achievement } from './achievements.model';
import { AchievementsService } from './achievements.service';

@Module({
  providers: [AchievementsService],
  imports: [SequelizeModule.forFeature([Achievement])],
  exports: [AchievementsService],
})
export class AchievementsModule {}
