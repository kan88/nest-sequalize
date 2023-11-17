import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewService } from './review.service';
import { ReviewsController } from './review.controller';
import { Review } from './review.model';
import { CommentsModule } from './0008-comments/comments.module';
import { Comment } from './0008-comments/comments.model';

@Module({
  providers: [ReviewService],
  controllers: [ReviewsController],
  imports: [SequelizeModule.forFeature([Review, Comment]), CommentsModule],
})
export class ReviewModule {}
