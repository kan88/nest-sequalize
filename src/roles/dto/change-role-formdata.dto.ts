import { ApiConsumes, ApiProperty } from '@nestjs/swagger';

export class ChangeRoleDto {
  readonly administrator_status: string;
  readonly administrator_id: string;
  readonly administrator_cn: string;
  readonly administrator_reject: string | null;
}
