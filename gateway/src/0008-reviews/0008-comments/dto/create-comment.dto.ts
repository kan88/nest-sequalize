import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'need to do a soon as possible',
    description: 'message',
  })
  review_comment?: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'need to do a soon as possible',
    description: 'message',
  })
  review_notification?: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Evgeny Kan',
    description: 'author',
  })
  review_author?: string | null;
}
