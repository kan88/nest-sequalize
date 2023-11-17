import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Index, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  idusers: number;
  @Index
  @ApiProperty({ example: 'Kan Evgeny Sergeevich', description: 'Fullname' })
  @Column({
    type: DataType.STRING,
  })
  cn: string;

  @ApiProperty({ example: '2321312312123', description: 'uniq id' })
  @Column({
    type: DataType.STRING,
  })
  objectsid: string;

  @ApiProperty({
    example: '20230925032042.0Z',
    description: 'date of change in AD',
  })
  @Column({
    type: DataType.STRING,
  })
  whenchanged: string;
  @ApiProperty({
    example: 'Konsultant',
    description: 'title',
  })
  @Column({
    type: DataType.STRING(),
  })
  title: string;

  @ApiProperty({
    example: '0123-123',
    description: 'work number',
  })
  @Index
  @Column({
    type: DataType.STRING(),
  })
  telephonenumber: string;
  @Index
  @ApiProperty({
    example: 'AIS',
    description: 'department',
  })
  @Column({
    type: DataType.STRING(),
  })
  department: string;
  @ApiProperty({
    example: 'FFKU Moscow',
    description: 'company',
  })
  @Column({
    type: DataType.STRING(),
  })
  company: string;
  @Index
  @ApiProperty({
    example: 'n7700-01122',
    description: 'ad account',
  })
  @Column({
    type: DataType.STRING(),
  })
  samaccountname: string;

  @ApiProperty({
    example: 'n7700-01122@mail.ru',
    description: 'mail',
  })
  @Column({
    type: DataType.STRING(),
  })
  mail: string;

  @ApiProperty({
    example: 'Bour Yana',
    description: 'manager',
  })
  @Column({
    type: DataType.STRING(),
  })
  manager: string;

  @ApiProperty({
    example: 'link.jpg',
    description: 'photo',
  })
  @Column({
    type: DataType.STRING(),
  })
  jpegphoto: string;
  @ApiProperty({
    example: 'n7700',
    description: 'sono',
  })
  @Column({
    type: DataType.STRING(),
  })
  sono: string;

  @ApiProperty({
    example: '0',
    description: 'rang',
  })
  @Column({
    type: DataType.STRING(),
  })
  rang: string;

  @ApiProperty({
    example: 'Igor Vitalievich',
    description: 'givenname',
  })
  @Column({
    type: DataType.STRING(),
  })
  givenname: string;

  @ApiProperty({
    example: 'Efimov',
    description: 'family',
  })
  @Column({
    type: DataType.STRING(),
  })
  sn: string;

  @ApiProperty({
    example: 'Departments:*Ais*Ais2',
    description: 'departments',
  })
  @Column({
    type: DataType.STRING(2000),
  })
  departments: string;
}
