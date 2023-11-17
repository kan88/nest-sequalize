import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @ApiProperty({
    example: 'n7700',
    description: 'sono user',
  })
  sono: string;
  @IsString()
  @ApiProperty({
    example: 'Breaking news',
    description: 'title',
  })
  title: string;
  @IsString()
  @ApiProperty({
    example: 'There is snow on the summer',
    description: 'description',
  })
  description: string;

  @IsString()
  @ApiProperty({ example: 'Evgeny Kan', description: 'User Fullname' })
  userlogin: number;

  @IsString()
  @ApiProperty({ example: 'n7700-01-121', description: 'AD Number' })
  account_number: number;
}
