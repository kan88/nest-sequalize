import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDocumentDatabaseDto {
  @IsString()
  @ApiProperty({
    example: 'Паспорт',
    description: 'Название документа',
  })
  readonly name: string;
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'id профиля',
  })
  readonly profile_id: number;

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
  @ApiProperty({
    example: '123123123',
    description: 'Номер документа',
  })
  readonly number: string;
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
