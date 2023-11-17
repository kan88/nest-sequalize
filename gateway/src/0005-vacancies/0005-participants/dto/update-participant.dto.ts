import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateParticipantDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Kan Evgeny',
    description: 'Fullname',
  })
  full_name?: string | null;
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 1, description: 'role of user' })
  role?: number | null;
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 1, description: 'view' })
  is_view?: number | null;
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 1, description: 'interview' })
  is_interview?: number | null;
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 1, description: 'approve' })
  is_approve?: number | null;
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 1, description: 'status' })
  status?: number | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'n7700-01-144',
    description: 'AD account number',
  })
  account_number?: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'link/121.jpg',
    description: 'AD account number',
  })
  avatar_src?: string | null;
  @IsString()
  @ApiPropertyOptional({
    example: 'Konsultant',
    description: 'name of title',
  })
  position?: string | null;
}
