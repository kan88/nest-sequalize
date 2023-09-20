import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWorkDatabaseDto {
  @IsString()
  @ApiProperty({
    example: 'Газпром',
    description: 'Название компании',
  })
  readonly company: string;
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'id профиля',
  })
  readonly profile_id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Главное управление',
    description: 'Название отдела',
  })
  readonly department: string;
  @IsString()
  @ApiProperty({
    example: 'Президент компании',
    description: 'Должность',
  })
  readonly title: string;
  @IsDateString()
  @ApiProperty({
    example: '2023-12-23',
    description: 'Дата начала',
  })
  readonly date_start: Date;
  @IsDateString()
  @ApiProperty({
    example: '2023-12-23',
    description: 'Дата увольнения',
  })
  readonly date_end: Date;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Администрирование отдела',
    description: 'Зона ответственности',
  })
  readonly responsibility: string;
}
