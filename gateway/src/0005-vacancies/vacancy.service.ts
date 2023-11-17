import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vacancy } from './vacancy.model';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { AdministratorService } from 'src/0000-roles/administrator.service';
import { E_ROLE, E_SERVICE, E_STATUS } from 'src/types/ENUMS';
import { Op } from 'sequelize';
import { filter } from 'rxjs';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Injectable()
export class VacancyService {
  constructor(
    @InjectModel(Vacancy) private vacancyRepository: typeof Vacancy,
    private rolesService: AdministratorService,
  ) {}

  async createVacancy(dto: CreateVacancyDto) {
    const vacancy = await this.vacancyRepository.create(dto);
    return vacancy;
  }

  async getAllVacancies() {
    const vacancies = await this.vacancyRepository.findAll({
      where: {
        status: 2,
      },
      include: { all: true },
    });
    return vacancies;
  }

  async updateVacancy(dto: UpdateVacancyDto, id: number) {
    const vacancy = await this.vacancyRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return vacancy;
  }

  async getById(id: number) {
    const vacancy = await this.vacancyRepository.findOne({
      where: {
        id,
      },
      include: { all: true },
    });
    return vacancy;
  }

  async getAllByIdArray(id: number[], status: number) {
    const vacancies = await this.vacancyRepository.findAll({
      where: {
        id,
        status,
      },
      include: { all: true },
    });
    return vacancies;
  }

  async getVacanciesBySamaccountname(samaccountname: string) {
    const superAdmin =
      await this.rolesService.getSuperAdminRoleBySamaccountname(samaccountname);
    const fullAdmin =
      await this.rolesService.getFullAdminRoleBySamaccountnameByService(
        samaccountname,
        E_SERVICE.VACANCY,
      );
    if (superAdmin || fullAdmin) {
      const vacancies = await this.vacancyRepository.findAll({
        where: {
          status: E_STATUS.CREATE,
        },
      });
      return vacancies;
    } else {
      const roles = await this.rolesService.getRolesBySamaccountnameByService(
        samaccountname,
        E_SERVICE.VACANCY,
      );
      const sonoAll = [];
      roles.map(
        (role) =>
          role.administrator_role === E_ROLE.EDIT &&
          role.administrator_visible_sono.map((sono) => sonoAll.push(sono)),
      );
      const vacancies = await this.vacancyRepository.findAll({
        where: {
          sono: [...new Set(sonoAll)],
          status: E_STATUS.CREATE,
        },
      });
      return vacancies;
    }
  }

  async getVacanciesBySamaccountnameWithFilter(
    samaccountname: string,
    status: E_STATUS,
  ) {
    //need to do schedule if server be lazy
    if (status === 5) {
      this.vacancyRepository.update(
        { status: 5 },
        {
          where: {
            date_close: { [Op.lte]: new Date() },
          },
        },
      );
    }
    const superAdmin =
      await this.rolesService.getSuperAdminRoleBySamaccountname(samaccountname);
    const fullAdmin =
      await this.rolesService.getFullAdminRoleBySamaccountnameByService(
        samaccountname,
        E_SERVICE.VACANCY,
      );
    if (superAdmin || fullAdmin) {
      const vacancies = await this.vacancyRepository.findAll({
        where: {
          status,
        },
      });
      return vacancies;
    } else {
      const roles = await this.rolesService.getRolesBySamaccountnameByService(
        samaccountname,
        E_SERVICE.VACANCY,
      );
      const sonoAll = [];
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].administrator_role >= E_ROLE.EDIT) {
          for (let k = 0; k < roles[i].administrator_visible_sono.length; k++) {
            sonoAll.push(roles[i].administrator_visible_sono[k]);
          }
        }
      }

      const vacancies = await this.vacancyRepository.findAll({
        where: {
          sono: [...new Set(sonoAll)],
          status,
        },
        include: { all: true },
      });
      return vacancies;
    }
  }
}
