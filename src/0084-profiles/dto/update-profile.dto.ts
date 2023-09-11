import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({
    example: 'ya@ya.ru',
    description: 'почта пользователя',
  })
  readonly email: string;
  @ApiProperty({
    example: '89167929272',
    description: 'Мобильный телефон',
  })
  readonly mobile: string;

  @ApiProperty({
    example: '89167929272',
    description: 'Мобильный телефон',
  })
  readonly birthplace: string;

  @ApiProperty({
    example: '21.01,85',
    description: 'Дата рождения',
  })
  readonly birthday: Date;

  @ApiProperty({
    example: true,
    description: 'видимость данных',
  })
  readonly visible: boolean;
}
