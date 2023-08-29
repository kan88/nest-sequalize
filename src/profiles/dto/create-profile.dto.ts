import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    example: 'n7700-01144',
    description: 'Учетная запись пользователя',
  })
  readonly samaccountname: string;
}
