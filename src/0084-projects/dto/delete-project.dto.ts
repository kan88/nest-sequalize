import { ApiProperty } from '@nestjs/swagger';

export class DeleteProjectDto {
  @ApiProperty({
    example: 1,
    description: 'id профиля',
  })
  readonly status: boolean = false;
}
