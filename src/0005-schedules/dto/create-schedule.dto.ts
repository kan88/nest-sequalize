import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsNumber()
  @ApiProperty({
    example: 12,
    description: 'Внешний ключ id из таблицы профилей',
  })
  id_request: number;
  @IsString()
  @ApiProperty({
    example: '10-20',
    description: 'period',
  })
  period: string[];
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'Full time',
  })
  type: number;
}
