import { E_STATUS } from 'src/types/ENUMS';

export class DeclineRoleDatabaseDto {
  administrator_status: E_STATUS;
  administrator_reject: string;
}
