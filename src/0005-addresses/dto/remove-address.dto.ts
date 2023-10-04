import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class RemoveAddressDto {
  @IsNumber()
  @ApiProperty({
    example: 2,
    description: 'status remove',
  })
  status: number;
}
