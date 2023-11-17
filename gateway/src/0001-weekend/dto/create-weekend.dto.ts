import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateWeekendDto {
  @IsString()
  @ApiProperty({
    example: 'Elada',
    description: 'hotel',
  })
  hotel: string;
  @IsString()
  @ApiProperty({
    example: '1',
    description: 'house',
  })
  house: string;
  @IsString()
  @ApiProperty({
    example: '07.09.23 - 10.09.23',
    description: 'dates',
  })
  dates: string;
  @ApiProperty({
    example: 'Одноместный однокомнатный',
    description: 'room',
  })
  room: string;
  @IsString()
  @ApiProperty({
    example: '0',
    description: '1/2 trip flag',
  })
  half: string;
  @IsString()
  @ApiProperty({
    example: '0',
    description: 'hot flag',
  })
  hot: string;
}
