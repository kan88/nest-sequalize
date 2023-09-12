import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @ApiProperty({
    example: 'Портал ФКУ Налог-Сервис ФНС России',
    description: 'Название проекта',
  })
  readonly project_name: string;
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'id профиля',
  })
  readonly profile_id: number;
}
