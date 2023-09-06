import { Injectable } from '@nestjs/common';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';
import { ChangeRoleDatabaseDto } from './dto/change-role-database.dto';
import { CreateRoleDatabaseDto } from './dto/create-role-database.dto';
import { DataTypes, Op, Sequelize } from 'sequelize';
import sequelize from 'sequelize';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDatabaseDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRolesBySamaccountname(samaaccountname: string) {
    const roles = await this.roleRepository.findAll({
      where: {
        [Op.and]: [
          { administrator_samaccountname: samaaccountname },
          { administrator_status: 1 },
          {
            administrator_date_start: {
              [Op.or]: [
                {
                  [Op.lte]: new Date().toDateString(),
                },
                {
                  [Op.eq]: null,
                },
              ],
            },
          },
          {
            administrator_date_end: {
              [Op.or]: [
                {
                  [Op.gte]: new Date().toDateString(),
                },
                {
                  [Op.eq]: null,
                },
              ],
            },
          },
        ],
      },
    });
    return roles;
  }

  async changeRole(dto: ChangeRoleDatabaseDto, id: number) {
    const role = await this.roleRepository.update(dto, {
      where: {
        administrator_id: id,
      },
      returning: true,
    });
    console.log(role);
    return role;
  }
}
