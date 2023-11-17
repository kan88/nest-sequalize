import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Like } from './0002-likes/likes.model';
import { Photo } from './0002-photos/photos.model';
import { CreateNewsDto } from './dto/create-news.dto';

@Table({ tableName: '0002-news' })
export class News extends Model<News, CreateNewsDto> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'n7700',
    description: 'sono user',
  })
  @Column({
    type: DataType.STRING(),
  })
  sono: string;

  @ApiProperty({
    example: 'Breaking news',
    description: 'title',
  })
  @Column({
    type: DataType.STRING(1000),
  })
  title: string;

  @ApiProperty({
    example: 'There is snow on the summer',
    description: 'description',
  })
  @Column({
    type: DataType.STRING(8000),
  })
  description: string;

  @ApiProperty({
    example: '/gr/0002/123123.jpg',
    description: 'description',
  })
  @Column({
    type: DataType.STRING(),
  })
  avatar: string;

  @ApiProperty({ example: 0, description: 'status of news' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  status: number;

  @ApiProperty({
    example: 'bad news',
    description: 'comment of reject',
  })
  @Column({
    type: DataType.STRING(),
  })
  comment: string;

  @ApiProperty({
    example: '/gr/0002/123123.pdf',
    description: 'description',
  })
  @Column({
    type: DataType.STRING(),
  })
  pdf: string;

  @ApiProperty({
    example: '/gr/0002/123123.mp4',
    description: 'description',
  })
  @Column({
    type: DataType.STRING(),
  })
  video: string;

  @ApiProperty({ example: 0, description: 'amount of views' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  views: number;

  @ApiProperty({ example: 'Evgeny Kan', description: 'User Fullname' })
  @Column({
    type: DataType.STRING(),
  })
  userlogin: string;

  @ApiProperty({ example: 'n7700-01-122', description: 'AD number' })
  @Column({
    type: DataType.STRING(),
  })
  account_number: string;

  @ApiProperty({ example: 0, description: 'amount of likes' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  likes: number;

  @HasMany(() => Photo)
  images: Photo[];

  @HasMany(() => Like)
  is_liked: Like[];
}
