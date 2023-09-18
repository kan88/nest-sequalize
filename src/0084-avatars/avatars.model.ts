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

interface I_AVATAR_CREATE {
  profile_id: number;
  avatar_src: string;
}

@Table({ tableName: '0084-avatars' })
export class Avatar extends Model<Avatar, I_AVATAR_CREATE> {
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
    example: '/profiles/avatars/wedwedwe.jpg',
    description: 'link',
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  avatar_src: string;

  @ApiProperty({
    example: true,
    description: 'True действительный, false удаленный',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  status: boolean;
}
