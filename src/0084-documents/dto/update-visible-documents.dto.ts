import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateVisibleDocumentsDto {
  @ApiProperty({
    example: true,
    description: 'Видимость для всех',
  })
  @IsBoolean()
  readonly visible: boolean;
}
