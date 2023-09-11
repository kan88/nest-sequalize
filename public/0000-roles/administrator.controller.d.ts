import { AdministratorService } from './administrator.service';
import { Role } from './administrator.model';
import { CreateRoleDatabaseDto } from './dto/create-role-database.dto';
import { E_STATUS } from 'src/types/ENUMS';
import { ChangeRoleFormdataDto } from './dto/change-role-formdata.dto';
import { DeclineRoleFormdataDto } from './dto/decline-role-formdata.dto';
export declare class AdministratorController {
    private rolesService;
    constructor(rolesService: AdministratorService);
    createRole(dto: CreateRoleDatabaseDto): Promise<Role>;
    getRolesBySamaccountname(samaccountname: string): Promise<Role[]>;
    getRolesBySamaccountnameByService(samaccountname: string, service: string): Promise<Role[]>;
    getRolesBySamaccountnameByStatus(samaccountname: string, status: string): Promise<Role[]>;
    changeRole(dto: ChangeRoleFormdataDto, id: string): Promise<[affectedCount: number, affectedRows: Role[]]>;
    declineRole(dto: DeclineRoleFormdataDto, id: string): Promise<[affectedCount: number, affectedRows: Role[]]>;
    getRequests(filter_status: E_STATUS[], samaccountname: string): Promise<Role[]>;
}
