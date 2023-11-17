import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @ApiProperty({
    example: 'Портал ФКУ Налог-Сервис ФНС России',
    description: 'Название проекта',
  })
  readonly project_name: string;

  @IsString()
  @ApiProperty({
    example: 'Проект | Отдел',
    description: 'тип ',
  })
  readonly type: string;
}
