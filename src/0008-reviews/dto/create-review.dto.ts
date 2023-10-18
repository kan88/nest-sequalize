import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Kan Evgeny Sergeevich',
    description: 'Full Name',
  })
  full_name?: string | null;

  @ApiProperty({
    example: 'New bug on index page',
    description: 'Title',
  })
  review_title: string;

  @ApiProperty({
    example: 'error in console.log',
    description: 'Description',
  })
  review_body: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'n7700-01-144',
    description: 'AD account',
  })
  account_number?: string | null;
}
