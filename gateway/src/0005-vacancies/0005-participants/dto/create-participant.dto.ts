import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateParticipantDto {
  @IsNumber()
  @ApiProperty({
    example: 12,
    description: 'Внешний ключ id из таблицы профилей',
  })
  id_request: number;
  @IsString()
  @ApiProperty({
    example: 'Kan Evgeny',
    description: 'Fullname',
  })
  full_name: string;
  @IsNumber()
  @ApiProperty({ example: 1, description: 'role of user' })
  role: number;
  @IsNumber()
  @ApiProperty({ example: 1, description: 'view' })
  is_view: number;
  @IsNumber()
  @ApiProperty({ example: 1, description: 'interview' })
  is_interview: number;
  @IsNumber()
  @ApiProperty({ example: 1, description: 'approve' })
  is_approve: number;

  @IsString()
  @ApiProperty({
    example: 'n7700-01-144',
    description: 'AD account number',
  })
  account_number: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'link/121.jpg',
    description: 'AD account number',
  })
  avatar_src?: string | null;
  @IsString()
  @ApiProperty({
    example: 'Konsultant',
    description: 'name of title',
  })
  position: string;
}
