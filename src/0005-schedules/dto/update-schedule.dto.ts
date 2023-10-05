import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateScheduleDto {
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({
    example: ['10-20', '11-12'],
    description: 'period',
  })
  period: string[];
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: 'Full time',
  })
  type: number;
}
