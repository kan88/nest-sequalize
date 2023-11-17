import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { T_ACHIEVEMENT } from 'src/types/TYPES';

export class CreateAchievementDto {
  @IsString()
  @ApiProperty({
    example: 'Почетная грамота',
    description: 'Название документа',
  })
  readonly type: string;

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
