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
import { News } from 'src/0002-news/news.model';
import { UpdateLikeDto } from './dto/create-photo.dto';
import { TPhoto } from './interfaces/create-photo';

@Table({ tableName: '0002-photos' })
export class Photo extends Model<Photo, TPhoto> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @BelongsTo(() => News)
  news: News;

  @ApiProperty({
    example: 1,
    description: 'id news',
  })
  @Index
  @ForeignKey(() => News)
  @Column({
    type: DataType.INTEGER,
  })
  news_id: number;

  @ApiProperty({
    example: '/home/src.jpg',
    description: 'link',
  })
  @Column({
    type: DataType.STRING(),
  })
  photos: string;

  @ApiProperty({
    example: true,
    description: 'status',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  status: boolean;
}
