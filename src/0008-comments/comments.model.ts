import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { Review } from 'src/0008-reviews/review.model';
import { CreateCommentDto } from './dto/create-comment.dto';

@Table({ tableName: '0008-comments' })
export class Comment extends Model<Comment, CreateCommentDto> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @BelongsTo(() => Review)
  review: Review;

  @ApiProperty({
    example: 12,
    description: 'Внешний ключ id из таблицы профилей',
  })
  @Index
  @ForeignKey(() => Review)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  review_id: number;

  @ApiProperty({
    example: 'need to do a soon as possible',
    description: 'message',
  })
  @Column({
    type: DataType.STRING(1000),
  })
  review_comment: string;

  @ApiProperty({
    example: 'need to do a soon as possible',
    description: 'message',
  })
  @Column({
    type: DataType.STRING(1000),
  })
  review_notification: string;

  @ApiProperty({
    example: 'Evgeny Kan',
    description: 'author',
  })
  @Column({
    type: DataType.STRING(),
  })
  review_author: string;
}
