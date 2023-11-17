import { ApiProperty } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Statistic } from 'src/0013-statistics/statistics.model';

export interface IVisit {
  ip_address: string;
  ip_user: string;
  ip_url: string;
  statistics_id?: number;
}

@Table({ tableName: '0013-visits' })
export class Visit extends Model<Visit, IVisit> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'ID' })
  @ForeignKey(() => Statistic)
  @Column({
    type: DataType.INTEGER,
  })
  statistics_id: number;

  @ApiProperty({
    example: '2023-08-03',
    description: 'date',
  })
  @Column({
    type: DataType.DATEONLY,
    defaultValue: Sequelize.fn('NOW'),
  })
  date: Date;

  @BelongsTo(() => Statistic)
  statistic: Statistic;

  @ApiProperty({
    example: '10.251.181.58',
    description: 'ip user',
  })
  @Column({
    type: DataType.STRING,
  })
  ip_address: number;

  @ApiProperty({
    example: 'n7700-01-144',
    description: 'AD User',
  })
  @Column({
    type: DataType.STRING,
  })
  ip_user: string;

  @ApiProperty({
    example: 'http://url.html',
    description: 'url',
  })
  @Column({
    type: DataType.STRING(355),
  })
  ip_url: string;
}
