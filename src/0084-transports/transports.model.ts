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

interface I_TRANSPORT_CREATE {
  profile_id: number;
  type: string;
  number: string;
  brand: string;
  model: string;
}

@Table({ tableName: '0084-transports' })
export class Transport extends Model<Transport, I_TRANSPORT_CREATE> {
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
    example: 'Автомобиль',
    description: 'Тип ТС',
  })
  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  type: string;

  @ApiProperty({
    example: 'р212рр777',
    description: 'Гос номер',
  })
  @Column({
    type: DataType.STRING(),
  })
  number: string;

  @ApiProperty({
    example: 'Mazda',
    description: 'Марка',
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  brand: string;

  @ApiProperty({
    example: 'cx-5',
    description: 'Модель',
  })
  @Column({
    type: DataType.STRING,
  })
  model: string;

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
