import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CreateReviewDto } from './dto/create-review.dto';

@Table({ tableName: '0008-reviews' })
export class Review extends Model<Review, CreateReviewDto> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Kan Evgeny Sergeevich',
    description: 'Full Name',
  })
  @Column({
    type: DataType.STRING(),
  })
  full_name: string;

  @ApiProperty({
    example: 'New bug on index page',
    description: 'Title',
  })
  @Column({
    type: DataType.STRING(),
  })
  review_title: string;

  @ApiProperty({
    example: 'error in console.log',
    description: 'Description',
  })
  @Column({
    type: DataType.STRING(1000),
  })
  review_body: string;

  @ApiProperty({
    example: 'n7700-01-144',
    description: 'AD account',
  })
  @Column({
    type: DataType.STRING(),
  })
  account_number: string;
  @ApiProperty({
    example: 'Evgeny Kan',
    description: 'FULLNAME admin',
  })
  @Column({
    type: DataType.STRING(),
  })
  review_admin: string;

  @ApiProperty({
    example: 1,
    description: 'Status',
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  status: number;
}
