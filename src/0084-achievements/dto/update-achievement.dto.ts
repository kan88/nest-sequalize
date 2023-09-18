import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAchievementDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Почетная грамота',
    description: 'Название документа',
    required: false,
    nullable: true,
  })
  readonly type?: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '2018',
    description: 'Год вручения',
    required: false,
    nullable: true,
  })
  readonly year?: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'За заслуги',
    description: 'Описание',
    required: false,
    nullable: true,
  })
  readonly description?: string | null;
}
