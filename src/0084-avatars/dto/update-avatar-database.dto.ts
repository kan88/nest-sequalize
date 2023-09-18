import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateAvatarDatabaseDto {
  @IsString()
  @ApiProperty({
    example: '/profiles/avatars/wedwedwe.jpg',
    description: 'link',
  })
  readonly avatar_src: string;
}
