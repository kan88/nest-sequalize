import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProfileDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    example: 'ya@ya.ru',
    description: 'почта пользователя',
    required: false,
    nullable: true,
  })
  readonly email?: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '89167929272',
    description: 'Мобильный телефон',
    required: false,
    nullable: true,
  })
  readonly mobile?: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Москва',
    description: 'Город рождения  ',
    required: false,
    nullable: true,
  })
  readonly birthplace?: string | null;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    example: '21.01,85',
    description: 'Дата рождения',
    required: false,
    nullable: true,
  })
  readonly birthday?: Date | null;
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    description: 'видимость данных',
    required: false,
    nullable: true,
  })
  readonly visible?: boolean | null;
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    description: 'видимость года рождения',
  })
  readonly visible_year?: boolean | null;
}
