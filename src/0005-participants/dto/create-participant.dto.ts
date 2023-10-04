import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { E_STATUS } from 'src/types/ENUMS';

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
  @IsNumber()
  @ApiProperty({ example: 1, description: 'status' })
  status: number;
  @IsString()
  @ApiProperty({
    example: 'n7700-01-144',
    description: 'AD account number',
  })
  account_number: string;
  @IsString()
  @ApiProperty({
    example: 'Konsultant',
    description: 'name of title',
  })
  position: string;
  @IsString()
  @ApiProperty({
    example: 'link',
    description: 'link on avatar',
  })
  avatar_src: string;
  @IsString()
  @ApiProperty({
    example: 'отказался',
    description: 'reason reject',
  })
  reason_reject: string;
}
