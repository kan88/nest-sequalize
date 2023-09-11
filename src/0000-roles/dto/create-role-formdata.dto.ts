export class CreateRoleDto {
  readonly administrator_cn: string;
  readonly administrator_samaccountname: string;
  readonly administrator_company: string;
  readonly administrator_department: string;
  readonly administrator_title: string;
  readonly administrator_service: string;
  readonly administrator_role: string;
  readonly administrator_sono: string;
  readonly administrator_forever: string;
  readonly administrator_comments: string;
  readonly administrator_visible_sono: string[];
  readonly administrator_telephone_number: string;
  readonly administrator_mobile_number: string | null;
  readonly administrator_mail: string;
  readonly administrator_author_samaccountname: string;
  readonly administrator_author_cn: string;
  readonly administrator_author_title: string;
  readonly administrator_author_department: string;
  readonly administrator_author_company: string;
  readonly administrator_author_telephone_number: string;
  readonly administrator_author_mail: string;
  readonly administrator_author_sono: string;
}
