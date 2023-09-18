import { ApiProperty } from '@nestjs/swagger';

export class AvatarUploadDto {
  @ApiProperty({
    description: 'file input name',
  })
  avatar_src: Express.Multer.File;
  @ApiProperty({
    example: 1,
    description: 'profile_id',
  })
  profile_id: number;
}
