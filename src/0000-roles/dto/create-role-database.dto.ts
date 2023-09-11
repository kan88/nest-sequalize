import { E_ROLE, E_SERVICE } from 'src/types/ENUMS';

export class CreateRoleDatabaseDto {
  administrator_cn: string;
  administrator_samaccountname: string;
  administrator_company: string;
  administrator_department: string;
  administrator_title: string;
  administrator_service: E_SERVICE;
  administrator_role: E_ROLE;
  administrator_sono: string;
  administrator_forever: string;
  administrator_comments: string;
  administrator_visible_sono: string[];
  administrator_telephone_number: string;
  administrator_mobile_number: string | null;
  administrator_mail: string;
  administrator_author_samaccountname: string;
  administrator_author_cn: string;
  administrator_author_title: string;
  administrator_author_department: string;
  administrator_author_company: string;
  administrator_author_telephone_number: string;
  administrator_author_mail: string;
  administrator_author_sono: string;
}
