import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateVisibleWorksDto {
  @ApiProperty({
    example: 1,
    description: 'id профиля',
  })
  @IsNumber()
  readonly profile_id: number;
  @ApiProperty({
    example: true,
    description: 'Видимость для всех',
  })
  @IsBoolean()
  readonly visible: boolean;
}
