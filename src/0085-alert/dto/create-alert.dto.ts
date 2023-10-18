import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAlertDto {
  @IsString()
  @ApiProperty({
    example: 'n7700-01-144',
    description: 'AD user',
  })
  account_number: string;
  @IsString()
  @ApiProperty({
    example: 'News',
    description: 'service',
  })
  alert_service: string;
  @IsString()
  @ApiProperty({
    example: 'About corporate',
    description: 'theme',
  })
  alert_theme: string;
  @IsString()
  @ApiProperty({
    example: 'The corporate will be tomorrow',
    description: 'description',
  })
  alert_body: string;
}
