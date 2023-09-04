import { Injectable } from '@nestjs/common';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleBySamaccountname } from './dto/create-role-by-samaaccountname';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async getRoles() {
    const roles = await this.roleRepository.findAll();
    return roles;
  }

  async createRoleByProfile(dto: CreateRoleBySamaccountname) {
    const role = await this.roleRepository.create(dto);
    return role;
  }
}
