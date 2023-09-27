import { ApiProperty } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { E_STATUS } from 'src/types/ENUMS';

@Table({ tableName: '0000-administrator' })
export class Vacancy extends Model<Vacancy, CreateVacancyDto> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'director',
    description: 'company titles',
  })
  @Column({
    type: DataType.STRING(200),
  })
  name_of_position: string;

  @ApiProperty({
    example: 'SEO',
    description: 'name of pisition for public',
  })
  @Column({
    type: DataType.STRING(200),
  })
  name_of_vacancy: string;

  @ApiProperty({
    example: 'ATI',
    description: 'name of department',
  })
  @Column({
    type: DataType.STRING(200),
  })
  department: string;

  @ApiProperty({
    example: 'FKU',
    description: 'name of filial',
  })
  @Column({
    type: DataType.STRING(300),
  })
  company: string;

  @ApiProperty({ example: '2020-09-22', description: 'date open' })
  @Column({
    type: DataType.DATEONLY,
  })
  date_open: Date;

  @ApiProperty({ example: '2020-09-22', description: 'date close' })
  @Column({
    type: DataType.DATEONLY,
  })
  date_close: Date;

  @ApiProperty({ example: 1, description: 'quantity of vacancies' })
  @Column({
    type: DataType.INTEGER,
  })
  employees_quantity: number;

  @ApiProperty({
    example: 'man',
    description: 'sex',
  })
  @Column({
    type: DataType.STRING(100),
  })
  sex_value: string;

  @ApiProperty({ example: 18, description: 'age min' })
  @Column({
    type: DataType.INTEGER,
  })
  age_min: number;

  @ApiProperty({ example: 55, description: 'age max' })
  @Column({
    type: DataType.INTEGER,
  })
  age_max: number;

  @ApiProperty({
    example: true,
    description: 'salary is gross',
  })
  @Column({
    type: DataType.BOOLEAN,
  })
  salary_gross: boolean;

  @ApiProperty({ example: 16000, description: 'salary min' })
  @Column({
    type: DataType.INTEGER,
  })
  salary_min: number;

  @ApiProperty({ example: 100000, description: 'salary max' })
  @Column({
    type: DataType.INTEGER,
  })
  salary_max: number;

  @ApiProperty({
    example: true,
    description: 'salary is visible',
  })
  @Column({
    type: DataType.BOOLEAN,
  })
  salary_show: boolean;

  @ApiProperty({
    example: '5 years',
    description: 'experience',
  })
  @Column({
    type: DataType.STRING(100),
  })
  experience: string;

  @ApiProperty({
    example: 'full time',
    description: 'shedule',
  })
  @Column({
    type: DataType.STRING(200),
  })
  employment_type: string;

  @ApiProperty({
    example: 'control dress-code',
    description: 'the main responsibilities',
  })
  @Column({
    type: DataType.STRING(2000),
  })
  functional: string;

  @ApiProperty({
    example: 'be friendly',
    description: 'our wishes about candidate',
  })
  @Column({
    type: DataType.STRING(2000),
  })
  wishes: string;

  @ApiProperty({
    example: 'Elon Mask',
    description: 'extra advantages',
  })
  @Column({
    type: DataType.STRING(2000),
  })
  advantages: string;

  @ApiProperty({
    example: 'LOFT style office',
    description: 'our offers',
  })
  @Column({
    type: DataType.STRING(2000),
  })
  offering: string;

  @ApiProperty({
    example: 'CREATE = 0, APPROVE = 1, DECLINE = 2, ARCHIVE = 3',
    description: 'status of vacancy',
  })
  @Column({
    type: DataType.STRING(2000),
  })
  status: E_STATUS;

  @ApiProperty({
    example: 'Princess Diana +7-999-999-99-99',
    description: 'HR Contacts',
  })
  @Column({
    type: DataType.STRING(2000),
  })
  contacts: string;

  @ApiProperty({
    example: 'Middle school',
    description: 'education',
  })
  @Column({
    type: DataType.STRING(2000),
  })
  education: string;

  @ApiProperty({ example: 1, description: 'date of request' })
  @Column({
    type: DataType.DATEONLY,
    defaultValue: Sequelize.fn('NOW'),
  })
  date: Date;
}
