import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { Notification } from 'src/0011-notification/notification.model';
import { CreateParticipantDto } from './dto/create-participant.dto';

@Table({ tableName: '0011-participants' })
export class Participant0011 extends Model<
  Participant0011,
  CreateParticipantDto
> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @BelongsTo(() => Notification)
  notification: Notification;

  @ApiProperty({ example: 1, description: 'chats_id' })
  @ForeignKey(() => Notification)
  @Column({
    type: DataType.INTEGER,
  })
  chats_id: number;

  @ApiProperty({
    example: 'n7700-01-144',
    description: 'AD account number',
  })
  @Column({
    type: DataType.STRING(),
  })
  account_number: string;

  @ApiProperty({
    example: 'fullname',
    description: 'fullname',
  })
  @Column({
    type: DataType.STRING(),
  })
  full_name: string;

  @ApiProperty({
    example: 'is actual',
    description: 'status',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  status: boolean;

  @ApiProperty({ example: '2023-08-21 05:16:04', description: 'last visit' })
  @Column({
    type: DataType.DATE,
    defaultValue: Sequelize.fn('NOW'),
  })
  last_visit: Date;

  @ApiProperty({ example: 0, description: 'unread_message' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  unread_messages: number;
}
