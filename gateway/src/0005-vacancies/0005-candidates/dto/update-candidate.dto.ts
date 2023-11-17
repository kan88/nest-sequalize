import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCandidateDto {
  @IsString()
  @ApiProperty({
    example: 'call me',
    description: 'message',
  })
  message: string;
}
