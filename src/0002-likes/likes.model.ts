import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
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

  @ApiProperty({
    example: 1,
    description: 'id news',
  })
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
