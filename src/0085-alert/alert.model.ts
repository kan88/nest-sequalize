import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CreateAlertDto } from './dto/create-alert.dto';

@Table({ tableName: '0085-alerts' })
export class Alert extends Model<Alert, CreateAlertDto> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'n7700-01-144',
    description: 'AD user',
  })
  @Column({
    type: DataType.STRING(),
  })
  account_number: string;

  @ApiProperty({
    example: 'News',
    description: 'service',
  })
  @Column({
    type: DataType.STRING(),
  })
  alert_service: string;

  @ApiProperty({
    example: 'About corporate',
    description: 'theme',
  })
  @Column({
    type: DataType.STRING(),
  })
  alert_theme: string;

  @ApiProperty({
    example: 'The corporate will be tomorrow',
    description: 'description',
  })
  @Column({
    type: DataType.STRING(1000),
  })
  alert_body: string;

  @ApiProperty({ example: false, description: 'is view' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  alert_is_view: boolean;

  @ApiProperty({
    example: 0,
    description: 'common type of alert',
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  alert_type: number;
}
