import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class RemoveParticipantDto {
  @IsString()
  @ApiProperty({
    example: 'отказался',
    description: 'reason reject',
  })
  reason_reject: string;

  @IsNumber()
  @ApiProperty({
    example: 2,
    description: 'status remove',
  })
  status: number;
}
