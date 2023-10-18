import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUploadDto {
  // @IsString()
  @ApiProperty({
    example: 'n7700-01-144',
    description: 'AD account number',
  })
  account_number: string;
  // @IsString()
  @ApiProperty({
    example: 'fullname',
    description: 'fullname',
  })
  full_name: string;
}
