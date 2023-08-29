import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProfileRole } from 'src/roles/model/profile-role.model';
import { Profile } from 'src/profiles/profiles.model';

interface TYPE_ROLE_CREATE {
  role: number;
  description: string;
  service: number;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, TYPE_ROLE_CREATE> {
  @ApiProperty({ example: 111, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 0, description: 'Идентификатор роли' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  role: number;

  @ApiProperty({ example: 'VIEW', description: 'Описание роли' })
  @Column({
    type: DataType.STRING,

    unique: true,
  })
  description: string;

  @BelongsToMany(() => Profile, () => ProfileRole)
  profiles: Profile[];
}
