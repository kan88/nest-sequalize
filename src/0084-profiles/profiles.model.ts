import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Project } from 'src/0084-projects/projects.model';

interface TYPE_PROFILE_CREATE {
  samaccountname: string;
}

@Table({ tableName: '0084-profiles' })
export class Profile extends Model<Profile, TYPE_PROFILE_CREATE> {
  @ApiProperty({ example: 111, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'n7700-01-144', description: 'Учетная запись' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  samaccountname: string;
  @ApiProperty({
    example: 'yandex@yandex.ru',
    description: 'дополнительная почта',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  email: string;
  @ApiProperty({ example: '89167929687', description: 'Мобильный номер' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  mobile: string;
  @ApiProperty({ example: '21.09.78', description: 'Дата рождения' })
  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  birthday: Date;
  @ApiProperty({ example: 'Москва', description: 'Место рождения' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  birthplace: string;
  @ApiProperty({
    example: true,
    description: 'Видимость личной информации для всех',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  })
  visible: boolean;

  @ApiProperty({
    example: true,
    description: 'Видимость года рождения',
  })
  @Column({
    type: DataType.BOOLEAN,
  })
  visible_year: boolean;

  @ApiProperty({ type: () => [Project] })
  @HasMany(() => Project)
  projects: Project[];
}
