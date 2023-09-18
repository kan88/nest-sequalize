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
import { T_ACHIEVEMENT } from 'src/types/TYPES';

interface I_ACHIEVEMENT_CREATE {
  profile_id: number;
  type: string;
  year: string;
  description: string;
  kind: T_ACHIEVEMENT;
}

@Table({ tableName: '0084-achievements' })
export class Achievement extends Model<Achievement, I_ACHIEVEMENT_CREATE> {
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
    example: 'Грамота или медаль',
    description: 'Тип награды',
  })
  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  type: string;

  @ApiProperty({
    example: '1988',
    description: 'Год получения',
  })
  @Column({
    type: DataType.STRING(),
  })
  year: string;

  @ApiProperty({
    example: 'Выдана за заслуги перед отечеством',
    description: 'Описание',
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: 'Personal | Career',
    description: 'Персональные или карьерные достижения',
  })
  @Column({
    type: DataType.STRING,
  })
  kind: T_ACHIEVEMENT;

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
