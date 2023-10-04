import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateScheduleDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '10-20',
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
