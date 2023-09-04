import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Profile } from 'src/profiles/profiles.model';

interface TYPE_ROLE_CREATE {
  role: number;
  samaccountname: string;
  service: number;
  date_end: string;
  date_start: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, TYPE_ROLE_CREATE> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: true, description: 'Статус роли' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  status: boolean;

  @ApiProperty({ example: 1, description: 'идентификатор сервиса' })
  @Column({
    type: DataType.INTEGER,
  })
  service: number;

  @ApiProperty({ example: 1, description: 'дата начала действия прав' })
  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  date_start: string;

  @ApiProperty({ example: 1, description: 'дата конца действия прав' })
  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  date_end: string;

  @BelongsTo(() => Profile)
  profile: Profile;
  @ApiProperty({ example: 1, description: 'учетная запись пользователя' })
  @ForeignKey(() => Profile)
  @Column({
    type: DataType.STRING,
  })
  samaccountname: string;
}
