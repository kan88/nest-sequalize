import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Education } from './education.model';
import { EducationService } from './education.service';

@Module({
  providers: [EducationService],
  imports: [SequelizeModule.forFeature([Education])],
  exports: [EducationService],
})
export class EducationModule {}
