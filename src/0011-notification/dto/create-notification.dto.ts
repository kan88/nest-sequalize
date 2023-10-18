import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @ApiProperty({
    example: 'n7700-01-144',
    description: 'AD account number',
  })
  notification_author: string;
  @IsString()
  @ApiProperty({
    example: 'fullname author',
    description: 'fullname',
  })
  notification_fullname: string;
  @IsString()
  @ApiProperty({
    example: 'About corporate',
    description: 'theme',
  })
  notification_theme: string;
}
