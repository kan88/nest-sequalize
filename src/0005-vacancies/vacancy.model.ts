import { ApiProperty } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { E_STATUS } from 'src/types/ENUMS';

@Table({ tableName: '0005-vacancy' })
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
    description: 'name of position for public',
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
    example: 'n7700',
    description: 'sono of filial',
  })
  @Column({
    type: DataType.STRING(100),
  })
  sono: string;

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

  @ApiProperty({ example: '2020-09-22', description: 'date publication' })
  @Column({
    type: DataType.DATEONLY,
  })
  date_publication: Date;

  @ApiProperty({ example: '2020-09-22', description: 'date archive' })
  @Column({
    type: DataType.DATEONLY,
  })
  date_archive: Date;

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
    type: DataType.INTEGER,
  })
  sex_value: number;

  @ApiProperty({ example: 18, description: 'age min ' })
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
    type: DataType.INTEGER,
  })
  salary_gross: number;

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
    description: 'salary checked',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  salary_checked: boolean;

  @ApiProperty({
    example: true,
    description: 'sex checked',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  sex_value_checked: boolean;

  @ApiProperty({
    example: true,
    description: 'age checked',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  age_checked: boolean;

  @ApiProperty({
    example: true,
    description: 'education checked',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  education_checked: boolean;

  @ApiProperty({
    example: true,
    description: 'position checked',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  name_of_position_checked: boolean;

  @ApiProperty({
    example: '5 years',
    description: 'experience',
  })
  @Column({
    type: DataType.INTEGER,
  })
  experience: number;

  @ApiProperty({
    example: 'full time',
    description: 'shedule',
  })
  @Column({
    type: DataType.INTEGER,
  })
  employment_type: number;

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
    type: DataType.INTEGER,
  })
  status: E_STATUS;

  @ApiProperty({
    example: 'Middle school',
    description: 'education',
  })
  @Column({
    type: DataType.INTEGER,
  })
  education: number;
}
