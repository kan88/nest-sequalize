import { ApiProperty } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CreateRoleDatabaseDto } from './dto/create-role-database.dto';

@Table({ tableName: '0000-administrator' })
export class Role extends Model<Role, CreateRoleDatabaseDto> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  administrator_id: number;

  @ApiProperty({ example: 1, description: 'role user' })
  @Column({
    type: DataType.INTEGER,
  })
  administrator_role: number;

  @ApiProperty({ example: 0, description: 'status role' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  administrator_status: number;

  @ApiProperty({ example: 1, description: 'date of request' })
  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
    defaultValue: Sequelize.fn('NOW'),
  })
  administrator_date_request: Date;

  @ApiProperty({ example: 1, description: 'number of service' })
  @Column({
    type: DataType.INTEGER,
  })
  administrator_service: number;

  @ApiProperty({ example: 1, description: 'the beginning of the role' })
  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  administrator_date_start: Date;

  @ApiProperty({ example: 1, description: 'end of role action' })
  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  administrator_date_end: Date;

  @ApiProperty({
    example: 'Рабочая необходимость',
    description: 'request comments',
  })
  @Column({
    type: DataType.STRING(2000),
  })
  administrator_comments: string;

  @ApiProperty({
    example: 'Согласовано',
    description: 'reject and approve comments',
  })
  @Column({
    type: DataType.STRING(2000),
  })
  administrator_reject: string;

  @ApiProperty({
    example: '8(97)1711',
    description: 'work number user',
  })
  @Column({
    type: DataType.STRING(200),
  })
  administrator_telephone_number: string;

  @ApiProperty({
    example: 'Консультант',
    description: 'title user',
  })
  @Column({
    type: DataType.STRING(200),
  })
  administrator_title: string;

  @ApiProperty({
    example: 'Консультант',
    description: 'title author',
  })
  @Column({
    type: DataType.STRING(200),
  })
  administrator_author_title: string;

  @ApiProperty({
    example: 'АИС',
    description: 'department author',
  })
  @Column({
    type: DataType.STRING(200),
  })
  administrator_author_department: string;

  @ApiProperty({
    example: 'АИС',
    description: 'department user',
  })
  @Column({
    type: DataType.STRING(200),
  })
  administrator_department: string;

  @ApiProperty({
    example: 'ФФКУ Налог Сервис по Москве',
    description: 'company author',
  })
  @Column({
    type: DataType.STRING(200),
  })
  administrator_author_company: string;

  @ApiProperty({
    example: 'ФФКУ Налог Сервис по Москве',
    description: 'company user',
  })
  @Column({
    type: DataType.STRING(200),
  })
  administrator_company: string;

  @ApiProperty({
    example: '8(912)32',
    description: 'work number author',
  })
  @Column({
    type: DataType.STRING(200),
  })
  administrator_author_telephone_number: string;

  @ApiProperty({
    example: 'mail@mail.ru',
    description: 'mail author',
  })
  @Column({
    type: DataType.STRING(200),
  })
  administrator_author_mail: string;

  @ApiProperty({
    example: 'mail@mail.ru',
    description: 'mail user',
  })
  @Column({
    type: DataType.STRING(200),
  })
  administrator_mail: string;

  @ApiProperty({
    example: 'n7700',
    description: 'sono author',
  })
  @Column({
    type: DataType.STRING(200),
  })
  administrator_author_sono: string;

  @ApiProperty({
    example: 'n7700',
    description: 'sono user',
  })
  @Column({
    type: DataType.STRING(200),
  })
  administrator_sono: string;

  @ApiProperty({
    example: ['n7700', 'n7701'],
    description: 'visible sono filter',
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING(2000)),
  })
  administrator_visible_sono: string[];

  @ApiProperty({
    example: 'Кан Евгений Сергеевич',
    description: 'fullname user',
  })
  @Column({
    type: DataType.STRING(200),
  })
  administrator_cn: string;

  @ApiProperty({
    example: 'n7700-01144',
    description: 'AD user',
  })
  @Column({
    type: DataType.STRING(200),
  })
  administrator_samaccountname: string;

  @ApiProperty({
    example: 'n7700-01144',
    description: 'AD user author',
  })
  @Column({
    type: DataType.STRING(200),
  })
  administrator_author_samaccountname: string;

  @ApiProperty({
    example: 'Кан Евгений Сергеевич',
    description: 'fullname author',
  })
  @Column({
    type: DataType.STRING(200),
  })
  administrator_author_cn: string;
}
