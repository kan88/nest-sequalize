import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateEducationDto {
  @IsString()
  @ApiProperty({
    example: 'МФЮА',
    description: 'Название университета',
    required: false,
    nullable: true,
  })
  readonly university?: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Экономики',
    description: 'Факультет',
    required: false,
    nullable: true,
  })
  readonly faculty?: string | null;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Экономист',
    description: 'Специализация',
    required: false,
    nullable: true,
  })
  readonly specialization?: string | null;
  @IsDateString()
  @ApiProperty({
    example: '2023-12-23',
    description: 'Дата окончания',
    required: false,
    nullable: true,
  })
  readonly date_off_issue?: Date | null;
  @IsString()
  @ApiProperty({
    example: 'бакалавр',
    description: 'Степень',
    required: false,
    nullable: true,
  })
  readonly degree?: string | null;
}
