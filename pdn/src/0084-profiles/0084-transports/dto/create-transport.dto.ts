import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTransportDto {
  @IsString()
  @ApiProperty({
    example: 'Автомобиль',
    description: 'Тип ТС',
  })
  readonly type: string;

  @IsString()
  @ApiProperty({
    example: 'р212рр777',
    description: 'Гос номер',
  })
  readonly number: string;
  @IsString()
  @ApiProperty({
    example: 'Mazda',
    description: 'Марка',
  })
  readonly brand: string;
  @IsString()
  @ApiProperty({
    example: 'cx-5',
    description: 'Модель',
  })
  model: string;
}
