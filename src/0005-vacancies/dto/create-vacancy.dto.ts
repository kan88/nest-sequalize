import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { E_STATUS } from 'src/types/ENUMS';

export class CreateVacancyDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'director',
    description: 'company titles',
  })
  name_of_position?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'SEO',
    description: 'name of position for public',
  })
  name_of_vacancy?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'ATI',
    description: 'name of department',
  })
  department: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'n7700',
    description: 'sono of filial',
  })
  sono?: string | null;
  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({ example: '2020-09-22', description: 'date open' })
  date_open?: Date | null;
  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({ example: '2020-09-22', description: 'date close' })
  date_close?: Date | null;
  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '2020-09-22',
    description: 'date publication',
  })
  date_publication?: Date | null;
  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({ example: '2020-09-22', description: 'date archive' })
  date_archive?: Date | null;
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 1, description: 'quantity of vacancies' })
  employees_quantity?: number | null;
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 0,
    description: 'sex man',
  })
  sex_value?: number | null;
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 18, description: 'age min' })
  age_min?: number | null;
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 55, description: 'age max' })
  age_max?: number | null;
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 0,
    description: 'salary is gross',
  })
  salary_gross?: number | null;
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 16000, description: 'salary min' })
  salary_min?: number | null;
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 100000, description: 'salary max' })
  salary_max?: number | null;
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    example: true,
    description: 'salary checked',
  })
  salary_checked?: boolean | null;
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    example: true,
    description: 'sex checked',
  })
  sex_value_checked?: boolean | null;
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    example: true,
    description: 'age checked',
  })
  age_checked?: boolean | null;
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    example: true,
    description: 'education checked',
  })
  education_checked?: boolean | null;
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    example: true,
    description: 'position checked',
  })
  name_of_position_checked?: boolean | null;
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1,
    description: 'experience',
  })
  experience?: number | null;
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1,
    description: 'shedule',
  })
  employment_type?: number | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'control dress-code',
    description: 'the main responsibilities',
  })
  functional?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'be friendly',
    description: 'our wishes about candidate',
  })
  wishes?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Elon Mask',
    description: 'extra advantages',
  })
  advantages?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'LOFT style office',
    description: 'our offers',
  })
  offering?: string | null;
  @IsNumber()
  @ApiProperty({
    example: 1,
    description:
      'status of vacancy, CREATE = 0, APPROVE = 1, DECLINE = 2, ARCHIVE = 3',
  })
  status: E_STATUS;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1,
    description: 'education',
  })
  education?: number | null;
}
