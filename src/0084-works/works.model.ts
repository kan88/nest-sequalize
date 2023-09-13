import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Profile } from 'src/0084-profiles/profiles.model';

interface I_WORK_CREATE {
  profile_id: number;
  company: string;
  title: string;
  department: string;
  date_start: Date;
  date_end: Date;
  charge: string;
}

@Table({ tableName: '0084-works' })
export class Work extends Model<Work, I_WORK_CREATE> {
  @ApiProperty({ example: 111, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @BelongsTo(() => Profile)
  profile: Profile;

  @ApiProperty({
    example: 12,
    description: 'Внешний ключ id из таблицы профилей',
  })
  @ForeignKey(() => Profile)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  profile_id: number;

  @ApiProperty({
    example: 'Газпром',
    description: 'Название компании',
  })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  company: string;

  @ApiProperty({
    example: 'Главное управление',
    description: 'Название отдела',
  })
  @Column({
    type: DataType.STRING(255),
  })
  department: string;

  @ApiProperty({
    example: 'Президент компании',
    description: 'Должность',
  })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: '2020-12-31',
    description: 'дата начала',
  })
  @Column({
    type: DataType.DATEONLY,
  })
  date_start: Date;

  @ApiProperty({
    example: '2020-12-31',
    description: 'дата увольнения',
  })
  @Column({
    type: DataType.DATEONLY,
  })
  date_end: Date;

  @ApiProperty({
    example: 'Администрирование отдела',
    description: 'Зона ответственности',
  })
  @Column({
    type: DataType.STRING(1000),
  })
  responsibility: string;

  @ApiProperty({
    example: true,
    description: 'Видимость',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  visible: boolean;

  @ApiProperty({
    example: true,
    description: 'True действительный документ, false удаленный',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  status: boolean;
}
