import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNumber()
  @ApiProperty({
    example: 12,
    description: 'Внешний ключ id из таблицы профилей',
  })
  id_request: number;
  @IsString()
  @ApiProperty({
    example: 'Moscow',
    description: 'city',
  })
  region: string;
  @IsString()
  @ApiProperty({
    example: 'Svoboda street',
    description: 'address',
  })
  address: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'planernaya',
    description: 'metro',
  })
  metro?: string | null;
}
