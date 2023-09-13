import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Work } from './works.model';
import { WorksService } from './works.service';

@Module({
  providers: [WorksService],
  imports: [SequelizeModule.forFeature([Work])],
  exports: [WorksService],
})
export class WorksModule {}
