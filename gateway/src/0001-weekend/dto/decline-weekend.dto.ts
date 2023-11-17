import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateWeekendDto } from './create-weekend.dto';

export class DeclineWeekendDto extends CreateWeekendDto {
  @IsString()
  @ApiProperty({
    example: 'not actual',
    description: 'reason reject',
  })
  reject_reason: string;

  @IsString()
  @ApiProperty({
    example: '3 decline or 4 remove',
    description: 'status',
  })
  status: string;
}
