import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLikeDto {
  @IsString()
  @ApiProperty({
    example: 'n7700-01-144',
    description: 'active directory account',
  })
  news_user: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '0',
    description: 'true',
  })
  news_like: string;
}
