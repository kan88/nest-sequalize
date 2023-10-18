import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentsService } from './comments.service';
import { Comment } from './comments.model';

@Module({
  providers: [CommentsService],
  controllers: [],
  imports: [SequelizeModule.forFeature([Comment])],
  exports: [CommentsService],
})
export class CommentsModule {}
