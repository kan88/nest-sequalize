import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Портал ФКУ Налог-Сервис ФНС России',
    description: 'Название проекта',
  })
  readonly project_name: string;

  @ApiProperty({
    example: 1,
    description: 'id профиля',
  })
  readonly profile_id: number;
}
