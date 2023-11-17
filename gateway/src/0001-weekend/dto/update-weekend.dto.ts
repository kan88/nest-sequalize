import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateWeekendDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: '34344',
    description: 'work number',
  })
  work?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Kan Evgeny Sergeevich',
    description: 'name',
  })
  name?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Konsultant',
    description: 'title',
  })
  title?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '+7(916)7929687',
    description: 'mobile number',
  })
  tel?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '23.10.23',
    description: 'mobile number',
  })
  date?: Date | null;
  @IsString()
  @ApiProperty({
    example: '0',
    description: 'status',
  })
  status: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'взрослых: 1',
    description: 'extra info',
  })
  info?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '0',
    description: '1/2',
  })
  part?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '07.09.23 - 10.09.23',
    description: 'new data',
  })
  newdate?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '07.09.23 - 10.09.23',
    description: 'new data',
  })
  freedate?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'comments',
    description: 'comments',
  })
  comments?: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'problem with alco',
    description: 'is_claim',
  })
  is_claim?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'n7700-01122',
    description: 'AD account',
  })
  login?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'n7700-01122',
    description: 'AD account',
  })
  sono?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Elada',
    description: 'hotel',
  })
  hotel?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '1',
    description: 'house',
  })
  house?: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Одноместный однокомнатный',
    description: 'room',
  })
  room?: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '0',
    description: 'hot flag',
  })
  hot?: string | null;
}
