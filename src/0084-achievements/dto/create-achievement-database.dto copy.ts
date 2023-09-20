import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { T_ACHIEVEMENT } from 'src/types/TYPES';

export class CreateAchievementDatabaseDto {
  @IsString()
  @ApiProperty({
    example: 'Почетная грамота',
    description: 'Название документа',
  })
  readonly type: string;
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'id профиля',
  })
  readonly profile_id: number;

  @IsString()
  @ApiProperty({
    example: '2018',
    description: 'Год вручения',
  })
  readonly year: string;
  @IsString()
  @ApiProperty({
    example: 'За заслуги',
    description: 'Описание',
  })
  readonly description: string;
  @IsString()
  @ApiProperty({
    example: 'Personal | Career',
    description: 'Вид награды',
  })
  kind: T_ACHIEVEMENT;
}
