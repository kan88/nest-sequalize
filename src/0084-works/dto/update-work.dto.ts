import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateWorkDto {
  @IsString()
  @ApiProperty({
    example: 'Газпром',
    description: 'Название компании',
    required: false,
    nullable: true,
  })
  readonly company?: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Главное управление',
    description: 'Название отдела',
    required: false,
    nullable: true,
  })
  readonly department?: string | null;
  @IsString()
  @ApiProperty({
    example: 'Президент компании',
    description: 'Должность',
    required: false,
    nullable: true,
  })
  readonly title?: string | null;
  @IsDateString()
  @ApiProperty({
    example: '2023-12-23',
    description: 'Дата начала',
    required: false,
    nullable: true,
  })
  readonly date_start?: Date | null;
  @IsDateString()
  @ApiProperty({
    example: '2023-12-23',
    description: 'Дата увольнения',
    required: false,
    nullable: true,
  })
  readonly date_end?: Date | null;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Администрирование отдела',
    description: 'Зона ответственности',
    required: false,
    nullable: true,
  })
  readonly responsibility?: string | null;
}
