import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { CreateWeekendDto } from './dto/create-weekend.dto';

@Table({ tableName: '0001-weekends' })
export class Weekend extends Model<Weekend, CreateWeekendDto> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '0',
    description: 'status',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: '0',
  })
  status: string;

  @ApiProperty({
    example: 'Kan Evgeny Sergeevich',
    description: 'name',
  })
  @Column({
    type: DataType.STRING(),
  })
  name: string;

  @ApiProperty({
    example: 'ya@ya.ru',
    description: 'mail',
  })
  @Column({
    type: DataType.STRING(),
  })
  mail: string;

  @ApiProperty({
    example: '+7(916)7929687',
    description: 'mobile number',
  })
  @Column({
    type: DataType.STRING(),
  })
  tel: string;

  @ApiProperty({ example: 'comments', description: 'comments' })
  @Column({
    type: DataType.STRING(1000),
  })
  comments: string;

  @ApiProperty({
    example: 0,
    description: 'common type of alert',
  })
  @Column({
    type: DataType.DATEONLY,
    defaultValue: Sequelize.fn('NOW'),
  })
  date: Date;

  @ApiProperty({
    example: 'Elada',
    description: 'hotel',
  })
  @Column({
    type: DataType.STRING(),
  })
  hotel: string;
  @ApiProperty({
    example: '1',
    description: 'house',
  })
  @Column({
    type: DataType.STRING(),
  })
  house: string;
  @ApiProperty({
    example: '07.09.23 - 10.09.23',
    description: 'dates',
  })
  @Column({
    type: DataType.STRING(),
  })
  dates: string;
  @ApiProperty({
    example: 'Одноместный однокомнатный',
    description: 'room',
  })
  @Column({
    type: DataType.STRING(),
  })
  room: string;
  @ApiProperty({
    example: '0',
    description: '1/2 trip flag',
  })
  @Column({
    type: DataType.STRING(),
  })
  half: string;
  @ApiProperty({
    example: '0',
    description: 'hot flag',
  })
  @Column({
    type: DataType.STRING(),
  })
  hot: string;
  @ApiProperty({
    example: 'взрослых: 1',
    description: 'extra info',
  })
  @Column({
    type: DataType.STRING(1000),
  })
  info: string;
  @ApiProperty({
    example: 'n7700-01122',
    description: 'AD account',
  })
  @Column({
    type: DataType.STRING(),
  })
  login: string;
  @ApiProperty({
    example: 'n7700',
    description: 'sono',
  })
  @Column({
    type: DataType.STRING(),
  })
  sono: string;

  @ApiProperty({
    example: '0',
    description: '1/2',
  })
  @Column({
    type: DataType.STRING(),
  })
  part: string;
  @ApiProperty({
    example: '07.09.23 - 10.09.23',
    description: 'new data',
  })
  @Column({
    type: DataType.STRING(),
  })
  newdate: string;
  @ApiProperty({
    example: 'reason',
    description: 'reject reason',
  })
  @Column({
    type: DataType.STRING(2000),
  })
  reject_reason: string;

  @ApiProperty({
    example: '07.09.23 - 10.09.23',
    description: 'first part',
  })
  @Column({
    type: DataType.STRING(),
  })
  numberfirst: string;

  @ApiProperty({
    example: '07.09.23 - 10.09.23',
    description: 'second part',
  })
  @Column({
    type: DataType.STRING(),
  })
  numbersecond: string;

  @ApiProperty({
    example: '07.09.23 - 10.09.23',
    description: 'free date',
  })
  @Column({
    type: DataType.STRING(),
  })
  freedate: string;

  @ApiProperty({
    example: '34344',
    description: 'work number',
  })
  @Column({
    type: DataType.STRING(),
  })
  work: string;

  @ApiProperty({
    example: '0',
    description: 'reject',
  })
  @Column({
    type: DataType.STRING(),
  })
  is_claim: string;

  @ApiProperty({
    example: 'Konsultant',
    description: 'title',
  })
  @Column({
    type: DataType.STRING(),
  })
  title: string;
}
