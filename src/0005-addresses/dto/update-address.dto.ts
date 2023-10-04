import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @ApiProperty({
    example: 'Moscow',
    description: 'city',
  })
  region?: string | null;
  @IsString()
  @ApiProperty({
    example: 'Svoboda street',
    description: 'address',
  })
  address?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'planernaya',
    description: 'metro',
  })
  metro?: string | null;
}
