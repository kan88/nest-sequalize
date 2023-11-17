import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Vacancy } from 'src/0005-vacancies/vacancy.model';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Table({ tableName: '0005-schedules' })
export class Schedule extends Model<Schedule, CreateScheduleDto> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @BelongsTo(() => Vacancy)
  vacancy: Vacancy;

  @ApiProperty({
    example: 12,
    description: 'Внешний ключ id из таблицы вакансий',
  })
  @ForeignKey(() => Vacancy)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_request: number;

  @ApiProperty({
    example: 'Moscow',
    description: 'city',
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  period: string[];

  @ApiProperty({ example: 1, description: 'status' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  status: number;

  @ApiProperty({
    example: 1,
    description: 'type',
  })
  @Column({
    type: DataType.INTEGER,
  })
  type: number;
}
