import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { E_STATUS } from 'src/types/ENUMS';

export class CreateVacancyDto {
  @ApiPropertyOptional({
    example: 'director',
    description: 'company titles',
  })
  name_of_position?: string | null;
  @IsOptional()
  @ApiPropertyOptional({
    example: 'SEO',
    description: 'name of position for public',
  })
  name_of_vacancy?: string | null;
  @ApiPropertyOptional({
    example: 'ATI',
    description: 'name of department',
  })
  department: string | null;
  @ApiPropertyOptional({
    example: 'n7700',
    description: 'sono of filial',
  })
  sono?: string | null;
  @ApiPropertyOptional({ example: '2020-09-22', description: 'date open' })
  date_open?: Date | null;
  @ApiPropertyOptional({ example: '2020-09-22', description: 'date close' })
  date_close?: Date | null;
  @ApiPropertyOptional({
    example: '2020-09-22',
    description: 'date publication',
  })
  date_publication?: Date | null;
  @ApiPropertyOptional({ example: '2020-09-22', description: 'date archive' })
  date_archive?: Date | null;
  @ApiPropertyOptional({ example: 1, description: 'quantity of vacancies' })
  employees_quantity?: number | null;
  @ApiPropertyOptional({
    example: 'man',
    description: 'sex',
  })
  sex_value?: string | null;
  @ApiPropertyOptional({ example: 18, description: 'age min' })
  age_min?: number | null;
  @ApiPropertyOptional({ example: 55, description: 'age max' })
  age_max?: number | null;
  @ApiPropertyOptional({
    example: true,
    description: 'salary is gross',
  })
  salary_gross?: boolean | null;
  @ApiPropertyOptional({ example: 16000, description: 'salary min' })
  salary_min?: number | null;
  @ApiPropertyOptional({ example: 100000, description: 'salary max' })
  salary_max?: number | null;
  @ApiPropertyOptional({
    example: true,
    description: 'salary checked',
  })
  salary_checked?: boolean | null;

  @ApiPropertyOptional({
    example: true,
    description: 'sex checked',
  })
  sex_value_checked?: boolean | null;

  @ApiPropertyOptional({
    example: true,
    description: 'age checked',
  })
  age_checked?: boolean | null;

  @ApiPropertyOptional({
    example: true,
    description: 'education checked',
  })
  education_checked?: boolean | null;

  @ApiPropertyOptional({
    example: true,
    description: 'position checked',
  })
  name_of_position_checked?: boolean;
  @ApiPropertyOptional({
    example: '5 years',
    description: 'experience',
  })
  experience?: string | null;
  @ApiPropertyOptional({
    example: 'full time',
    description: 'shedule',
  })
  employment_type?: string | null;

  @ApiPropertyOptional({
    example: 'control dress-code',
    description: 'the main responsibilities',
  })
  functional?: string | null;

  @ApiPropertyOptional({
    example: 'be friendly',
    description: 'our wishes about candidate',
  })
  wishes?: string | null;
  @ApiPropertyOptional({
    example: 'Elon Mask',
    description: 'extra advantages',
  })
  advantages?: string | null;
  @ApiPropertyOptional({
    example: 'LOFT style office',
    description: 'our offers',
  })
  offering?: string | null;
  @ApiProperty({
    example: 1,
    description:
      'status of vacancy, CREATE = 0, APPROVE = 1, DECLINE = 2, ARCHIVE = 3',
  })
  status: E_STATUS;
  @ApiPropertyOptional({
    example: 'Princess Diana +7-999-999-99-99',
    description: 'HR Contacts',
  })
  contacts?: string | null;
  @ApiPropertyOptional({
    example: 'Middle school',
    description: 'education',
  })
  education?: string | null;
}
