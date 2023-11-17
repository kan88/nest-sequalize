import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { News } from '../news.model';
import { UpdateLikeDto } from './dto/update-like.dto';

@Table({ tableName: '0002-likes' })
export class Like extends Model<Like, UpdateLikeDto> {
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
  @ForeignKey(() => News)
  @Column({
    type: DataType.INTEGER,
  })
  news_id: number;
  @ApiProperty({
    example: 'n7700-01-144',
    description: 'active directory account',
  })
  @Column({
    type: DataType.STRING(50),
  })
  news_user: string;
  @ApiProperty({
    example: true,
    description: 'status',
  })
  @Column({
    type: DataType.STRING(2),
    defaultValue: '0',
  })
  news_like: string;
}
