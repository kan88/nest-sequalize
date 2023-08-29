import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleByProfile } from './dto/create-role-by-profile';
import { ProfileRole } from './model/profile-role.model';
import { CreateRoleById } from './dto/create-role-by-id';
import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private roleRepository: typeof Role,
    @InjectModel(ProfileRole) private profileRoleRepository: typeof ProfileRole,
  ) {}
  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoles() {
    const roles = await this.roleRepository.findAll();
    return roles;
  }

  async getRoleByRole(role: number) {
    const { id } = await this.roleRepository.findOne({
      where: { role: role },
    });
    return id;
  }

  async createRoleByProfile(dto: CreateRoleById) {
    const role = await this.profileRoleRepository.create(dto);
    return role;
  }
}
