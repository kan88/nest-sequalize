import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeclineCandidateDto {
  @IsString()
  @ApiProperty({
    example: 'sorry',
    description: 'message',
  })
  message: string;

  @IsString()
  @ApiProperty({
    example: 'angry person',
    description: 'resaon of reject',
  })
  reason_reject: string;
}
