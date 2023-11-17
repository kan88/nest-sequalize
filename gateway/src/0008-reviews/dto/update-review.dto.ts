import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    example: 2,
    description: 'status',
  })
  status?: number | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Evgeny Kan',
    description: 'admin name',
  })
  review_admin?: string | null;
}
