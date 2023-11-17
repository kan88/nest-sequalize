import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Notification } from 'src/0011-notification/notification.model';
import { CreateMessageDto } from './dto/create-message.dto';

export interface IMessage extends CreateMessageDto {
  chats_id: number;
  link?: string | null;
}

@Table({ tableName: '0011-messages' })
export class Message extends Model<Message, IMessage> {
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
    example: 'text',
    description: 'text',
  })
  @Column({
    type: DataType.STRING(2000),
  })
  body: string;

  @ApiProperty({
    example: 'is actual',
    description: 'status',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  status: boolean;

  @ApiProperty({
    example: '/gr/0011/12312.jpg',
    description: 'link to gr',
  })
  @Column({
    type: DataType.STRING(),
  })
  link: string;
}
