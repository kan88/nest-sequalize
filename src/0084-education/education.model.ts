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

interface I_EDUCATION_CREATE {
  profile_id: number;
  university: string;
  faculty: string;
  specialization: string;
  date_off_issue: Date;
  degree: string;
}

@Table({ tableName: '0084-educations' })
export class Education extends Model<Education, I_EDUCATION_CREATE> {
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
    example: 'МФЮА',
    description: 'Университет',
  })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  university: string;

  @ApiProperty({
    example: 'Экономики',
    description: 'Факультет',
  })
  @Column({
    type: DataType.STRING(255),
  })
  faculty: string;

  @ApiProperty({
    example: 'Инженер-технолог',
    description: 'Специализация',
  })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  specialization: string;

  @ApiProperty({
    example: '2020-12-31',
    description: 'дата окончания',
  })
  @Column({
    type: DataType.DATEONLY,
  })
  date_off_issue: Date;

  @ApiProperty({
    example: 'Бакалавр',
    description: 'Степень',
  })
  @Column({
    type: DataType.STRING(255),
  })
  degree: string;

  @ApiProperty({
    example: true,
    description: 'видимость',
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
