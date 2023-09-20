import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTransportDatabaseDto {
  @IsString()
  @ApiProperty({
    example: 'Автомобиль',
    description: 'Тип ТС',
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
