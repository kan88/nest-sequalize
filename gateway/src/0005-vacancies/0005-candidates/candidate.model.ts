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

export interface ICandidate<T> {
  id_request: number;
  first_name: string;
  second_name: string;
  date_of_birhday: Date;
  account_number: string;
  city: string;
  priority_contact: string;
  mobile_phone: string;
  mail: string;
  sono: string;
  cv: T;
  third_name?: string | null;
  telegramm?: string | null;
  whatsapp?: string | null;
  priority_address?: string | null;
  photo?: T | null;
  body?: string | null;
}

export type TCandidate = Omit<ICandidate<Express.Multer.File>, 'cv' | 'photo'>;

@Table({ tableName: '0005-candidates' })
export class Candidate extends Model<Candidate, ICandidate<string>> {
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
    example: 'Kan',
    description: 'first name',
  })
  @Column({
    type: DataType.STRING(),
  })
  first_name: string;

  @ApiProperty({
    example: 'Kan',
    description: 'second name',
  })
  @Column({
    type: DataType.STRING(),
  })
  second_name: string;

  @ApiProperty({
    example: 'Kan',
    description: 'third name',
  })
  @Column({
    type: DataType.STRING(),
  })
  third_name: string;

  @ApiProperty({
    example: 'n7700',
    description: 'sono',
  })
  @Column({
    type: DataType.STRING(),
  })
  sono: string;

  @ApiProperty({
    example: 'n7700-00-011',
    description: 'AD number',
  })
  @Column({
    type: DataType.STRING(),
  })
  account_number: string;

  @ApiProperty({
    example: '2024-10-12',
    description: 'birthday',
  })
  @Column({
    type: DataType.DATEONLY,
  })
  date_of_birhday: Date;

  @ApiProperty({ example: 'Moscow', description: 'city' })
  @Column({
    type: DataType.STRING,
  })
  city: string;

  @ApiProperty({ example: 'mobile', description: 'contact' })
  @Column({
    type: DataType.STRING,
  })
  priority_contact: string;

  @ApiProperty({ example: '8(999)9999999', description: 'mobile' })
  @Column({
    type: DataType.STRING,
  })
  mobile_phone: string;

  @ApiProperty({ example: 'ya@ya.ru', description: 'mail' })
  @Column({
    type: DataType.STRING,
  })
  mail: string;

  @ApiProperty({ example: 'telegramm', description: 'telegramm' })
  @Column({
    type: DataType.STRING,
  })
  telegramm: string;

  @ApiProperty({ example: 'whatsapp', description: 'whatsapp' })
  @Column({
    type: DataType.STRING,
  })
  whatsapp: string;

  @ApiProperty({ example: 'priority_address', description: 'priority_address' })
  @Column({
    type: DataType.STRING,
  })
  priority_address: string;

  @ApiProperty({ example: 'cv', description: 'cv' })
  @Column({
    type: DataType.STRING,
  })
  cv: string;

  @ApiProperty({ example: 'photo', description: 'photo' })
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @ApiProperty({ example: 'body', description: 'body' })
  @Column({
    type: DataType.STRING(1000),
  })
  body: string;

  @ApiProperty({ example: 1, description: 'status' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  status: number;

  @ApiProperty({
    example: 'reason_reject',
    description: 'reason_reject',
  })
  @Column({
    type: DataType.STRING(),
  })
  reason_reject: string;

  @ApiProperty({
    example: 'message',
    description: 'message',
  })
  @Column({
    type: DataType.STRING(),
  })
  message: string;
}
