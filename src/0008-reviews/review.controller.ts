import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { Review } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Comment } from 'src/0008-comments/comments.model';
import { CreateCommentDto } from 'src/0008-comments/dto/create-comment.dto';

@ApiTags('Отзывы пользователей')
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewService) {}

  @ApiOperation({ summary: 'Получение актуальных' })
  @ApiResponse({ status: 200, type: [Review] })
  @Get()
  async get() {
    const data = await this.reviewsService.get();
    return data;
  }

  @ApiOperation({ summary: 'Получение актуальных' })
  @ApiResponse({ status: 200, type: [Review] })
  @Get('/archive')
  async getArchive() {
    const data = await this.reviewsService.getArchive();
    return data;
  }

  @ApiOperation({ summary: 'Создание отзыва' })
  @ApiResponse({ status: 201, type: Review })
  @Post()
  async create(@Body() dto: CreateReviewDto) {
    const data = await this.reviewsService.create(dto);
    return data;
  }

  @ApiOperation({ summary: 'Обновление отзыва' })
  @ApiResponse({ status: 201, type: Review })
  @Patch('/:id')
  async update(
    @Body() dto: UpdateReviewDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.reviewsService.update(dto, id);
    return data;
  }

  @ApiOperation({ summary: 'Получение комментариев' })
  @ApiResponse({ status: 200, type: [Comment] })
  @Get('/:id/comment')
  async getComments(@Param('id', ParseIntPipe) review_id: number) {
    const data = await this.reviewsService.getComments(review_id);
    return data;
  }

  @ApiOperation({ summary: 'Добавление комментария' })
  @ApiResponse({ status: 201, type: Comment })
  @Post('/:id/comment')
  async createComment(
    @Body() dto: CreateCommentDto,
    @Param('id', ParseIntPipe) review_id: number,
  ) {
    const data = await this.reviewsService.createComment(dto, review_id);
    return data;
  }
}
