import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateDocumentDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Паспорт',
    description: 'Название документа',
    required: false,
    nullable: true,
  })
  readonly name?: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '121121',
    description: 'Серия документа',
    required: false,
    nullable: true,
  })
  readonly serial?: string | null;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '123123123',
    description: 'Номер документа',
    required: false,
    nullable: true,
  })
  readonly number?: string | null;
  @IsDateString()
  @IsOptional()
  @ApiProperty({
    example: '2023-12-23',
    description: 'Дата выдачи',
    required: false,
    nullable: true,
  })
  readonly date_off_issue?: Date | null;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '123-232',
    description: 'Код-подразделения',
    required: false,
    nullable: true,
  })
  readonly division_code?: string | null;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'УФНС России',
    description: 'Кем выдан',
    required: false,
    nullable: true,
  })
  readonly issued_by?: string | null;
}
