import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @ApiProperty({
    example: 'n7700-01-144',
    description: 'AD account number',
  })
  account_number: string;
  @IsString()
  @ApiProperty({
    example: 'fullname',
    description: 'fullname',
  })
  full_name: string;
  @IsString()
  @ApiProperty({
    example: 'text',
    description: 'text',
  })
  body: string;
}
