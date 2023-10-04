import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Vacancy } from 'src/0005-vacancies/vacancy.model';
import { CreateAddressDto } from './dto/create-address.dto';

@Table({ tableName: '0005-addresses' })
export class Address extends Model<Address, CreateAddressDto> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @BelongsTo(() => Vacancy)
  vacancy: Vacancy;

  @ApiProperty({
    example: 12,
    description: 'Внешний ключ id из таблицы вакансий',
  })
  @ForeignKey(() => Vacancy)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_request: number;

  @ApiProperty({
    example: 'Moscow',
    description: 'city',
  })
  @Column({
    type: DataType.STRING(200),
  })
  region: string;

  @ApiProperty({ example: 1, description: 'status' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  status: number;

  @ApiProperty({
    example: 'Svoboda street',
    description: 'address',
  })
  @Column({
    type: DataType.STRING(200),
  })
  address: string;

  @ApiProperty({
    example: 'planernaya',
    description: 'metro',
  })
  @Column({
    type: DataType.STRING(200),
  })
  metro: string;
}
