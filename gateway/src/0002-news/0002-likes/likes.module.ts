import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './likes.model';
import { LikesService } from './likes.service';

@Module({
  providers: [LikesService],
  imports: [SequelizeModule.forFeature([Like])],
  exports: [LikesService],
})
export class LikesModule {}
