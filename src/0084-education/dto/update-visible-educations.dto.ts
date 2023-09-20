import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateVisibleEducationsDto {
  @ApiProperty({
    example: true,
    description: 'Видимость для всех',
  })
  @IsBoolean()
  readonly visible: boolean;
}
