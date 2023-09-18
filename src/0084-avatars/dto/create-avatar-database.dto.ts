import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateAvatarDatabaseDto {
  @IsString()
  @ApiProperty({
    example: '/profiles/avatars/wedwedwe.jpg',
    description: 'link',
  })
  readonly avatar_src: string;
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'id профиля',
  })
  readonly profile_id: number;
}
