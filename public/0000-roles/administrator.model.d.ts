import { Model } from 'sequelize-typescript';
import { CreateRoleDatabaseDto } from './dto/create-role-database.dto';
export declare class Role extends Model<Role, CreateRoleDatabaseDto> {
    administrator_id: number;
    administrator_role: number;
    administrator_status: number;
    administrator_date_request: Date;
    administrator_service: number;
    administrator_date_start: Date;
    administrator_date_end: Date;
    administrator_comments: string;
    administrator_reject: string;
    administrator_telephone_number: string;
    administrator_title: string;
    administrator_author_title: string;
    administrator_author_department: string;
    administrator_department: string;
    administrator_author_company: string;
    administrator_company: string;
    administrator_author_telephone_number: string;
    administrator_author_mail: string;
    administrator_mail: string;
    administrator_author_sono: string;
    administrator_sono: string;
    administrator_visible_sono: string[];
    administrator_cn: string;
    administrator_samaccountname: string;
    administrator_author_samaccountname: string;
    administrator_author_cn: string;
}
