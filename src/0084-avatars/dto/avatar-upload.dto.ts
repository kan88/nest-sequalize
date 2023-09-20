import { ApiProperty } from '@nestjs/swagger';

export class AvatarUploadDto {
  @ApiProperty({
    description: 'file input name',
  })
  avatar_src: Express.Multer.File;
}
