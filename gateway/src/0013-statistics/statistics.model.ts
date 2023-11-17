import { ApiProperty } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';
import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Visit } from './0013-visits/visits.model';

@Table({ tableName: '0013-statistics' })
export class Statistic extends Model<Statistic> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '2023-08-03',
    description: 'date',
  })
  @Column({
    type: DataType.DATEONLY,
    defaultValue: Sequelize.fn('NOW'),
  })
  date: Date;

  @ApiProperty({
    example: 0,
    description: 'amount of unique hosts',
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  hosts: number;

  @ApiProperty({
    example: 0,
    description: 'views',
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  views: number;

  @HasMany(() => Visit)
  visits: Visit[];
}
