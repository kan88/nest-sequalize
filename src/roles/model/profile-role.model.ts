import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { Profile } from '../../profiles/profiles.model';

@Table({ tableName: 'profile_roles', createdAt: false, updatedAt: false })
export class ProfileRole extends Model<ProfileRole> {
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
    unique: true,
  })
  service: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.STRING,
  })
  roleId: number;

  @ForeignKey(() => Profile)
  @Column({
    type: DataType.INTEGER,
  })
  profileId: number;
}
