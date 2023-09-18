import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTransportDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Автомобиль',
    description: 'Тип ТС',
    nullable: true,
    required: false,
  })
  readonly type?: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'р212рр777',
    description: 'Гос номер',
    nullable: true,
    required: false,
  })
  readonly number?: string | null;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Mazda',
    description: 'Марка',
    nullable: true,
    required: false,
  })
  readonly brand?: string | null;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'cx-5',
    description: 'Модель',
    nullable: true,
    required: false,
  })
  readonly model?: string | null;
}
