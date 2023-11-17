import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comments.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
  ) {}

  async create(dto: CreateCommentDto, review_id: number) {
    const data = await this.commentRepository.create({
      ...dto,
      ...{ review_id },
    });
    return data;
  }

  async get(review_id: number) {
    const data = await this.commentRepository.findAll({
      where: {
        review_id,
      },
    });
    return data;
  }
}
