import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/0000-roles/administrator.model';
import { Profile } from 'src/0084-profiles/profiles.model';

interface I_PROJECT_CREATE {
  profile_id: number;
  profile_name: string;
}

@Table({ tableName: '0084-projects' })
export class Project extends Model<Project, I_PROJECT_CREATE> {
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
    example: 'Портал ФКУ Налог-Сервис ФНС России',
    description: 'название проекта',
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  project_name: string;

  @ApiProperty({
    example: 'Проект | Отдел',
    description: 'тип',
  })
  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  type: string;

  @ApiProperty({
    example: true,
    description: 'True действительный проект, false удаленный',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  status: boolean;
}
