import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { T_ACHIEVEMENT } from 'src/types/TYPES';

export class UpdateVisibleAchievementsDto {
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

  @ApiProperty({
    example: 'Career | Personal',
    description: 'тип блока видимости',
  })
  @IsString()
  readonly kind: T_ACHIEVEMENT;
}
