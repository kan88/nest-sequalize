import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateNewsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Breaking news',
    description: 'title',
  })
  title?: string | null;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'There is snow on the summer',
    description: 'description',
  })
  description?: string | null;
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: 'status approve',
  })
  status?: number | null;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'too bad news',
    description: 'reject reason',
  })
  comment?: string | null;
}
