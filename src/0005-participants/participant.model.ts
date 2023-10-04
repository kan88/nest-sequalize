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
import { CreateParticipantDto } from './dto/create-participant.dto';

@Table({ tableName: '0005-participants' })
export class Participant extends Model<Participant, CreateParticipantDto> {
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
    description: 'Внешний ключ id из таблицы профилей',
  })
  @ForeignKey(() => Vacancy)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_request: number;

  @ApiProperty({
    example: 'Kan Evgeny',
    description: 'Fullname',
  })
  @Column({
    type: DataType.STRING(200),
  })
  full_name: string;

  @ApiProperty({ example: 1, description: 'role of user' })
  @Column({
    type: DataType.INTEGER,
  })
  role: number;

  @ApiProperty({ example: 1, description: 'view' })
  @Column({
    type: DataType.INTEGER,
  })
  is_view: number;

  @ApiProperty({ example: 1, description: 'interview' })
  @Column({
    type: DataType.INTEGER,
  })
  is_interview: number;

  @ApiProperty({ example: 1, description: 'approve' })
  @Column({
    type: DataType.INTEGER,
  })
  is_approve: number;

  @ApiProperty({ example: 1, description: 'status' })
  @Column({
    type: DataType.INTEGER,
  })
  status: number;

  @ApiProperty({
    example: 'n7700-01-144',
    description: 'AD account number',
  })
  @Column({
    type: DataType.STRING(200),
  })
  account_number: string;

  @ApiProperty({
    example: 'Konsultant',
    description: 'name of title',
  })
  @Column({
    type: DataType.STRING(200),
  })
  position: string;

  @ApiProperty({
    example: 'link',
    description: 'link on avatar',
  })
  @Column({
    type: DataType.STRING,
  })
  avatar_src: string;

  @ApiProperty({
    example: 'отказался',
    description: 'reason reject',
  })
  @Column({
    type: DataType.STRING,
  })
  reason_reject: string;
}
