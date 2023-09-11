import { Role } from './administrator.model';
import { ChangeRoleDatabaseDto } from './dto/change-role-database.dto';
import { CreateRoleDatabaseDto } from './dto/create-role-database.dto';
import { DeclineRoleDatabaseDto } from './dto/decline-role-database.dto';
import { E_STATUS } from 'src/types/ENUMS';
export declare class AdministratorService {
    private administratorRepository;
    constructor(administratorRepository: typeof Role);
    createRole(dto: CreateRoleDatabaseDto): Promise<Role>;
    getRolesBySamaccountname(samaaccountname: string): Promise<Role[]>;
    getFullRolesBySamaccountname(samaaccountname: string): Promise<Role[]>;
    getFilteredRequestsByServiceBySono(filter: E_STATUS[], sono: string[]): Promise<Role[]>;
    getSuperAdminRoleBySamaccountname(samaaccountname: string): Promise<number>;
    getRolesBySamaccountnameByService(samaaccountname: string, service: number): Promise<Role[]>;
    getRolesBySamaccountnameByStatus(samaaccountname: string, status: E_STATUS): Promise<Role[]>;
    getAllRequsts(filter: E_STATUS[]): Promise<Role[]>;
    changeRole(dto: ChangeRoleDatabaseDto, id: number): Promise<[affectedCount: number, affectedRows: Role[]]>;
    declineRole(dto: DeclineRoleDatabaseDto, id: number): Promise<[affectedCount: number, affectedRows: Role[]]>;
}
