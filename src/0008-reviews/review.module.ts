import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewService } from './review.service';
import { ReviewsController } from './review.controller';
import { Review } from './review.model';
import { Comment } from 'src/0008-comments/comments.model';
import { CommentsModule } from 'src/0008-comments/comments.module';

@Module({
  providers: [ReviewService],
  controllers: [ReviewsController],
  imports: [SequelizeModule.forFeature([Review, Comment]), CommentsModule],
})
export class ReviewModule {}
