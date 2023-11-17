import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/9999-files/files.service';
import { E_ROLE, E_SERVICE, E_SERVICES_CODE } from 'src/types/ENUMS';
import { Candidate, TCandidate } from './candidate.model';
import { DeclineCandidateDto } from './dto/decline-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { AdministratorService } from 'src/0000-roles/administrator.service';

@Injectable()
export class CandidateService {
  constructor(
    @InjectModel(Candidate) private candidateRepository: typeof Candidate,
    private filesService: FilesService,
    private rolesService: AdministratorService,
  ) {}

  async create(
    dto: TCandidate,
    cv_file: Express.Multer.File,
    photo_file: Express.Multer.File = null,
  ) {
    let photo_link = '';
    if (photo_file) {
      photo_link = await this.filesService.createFile(
        E_SERVICES_CODE.vacancy,
        photo_file,
      );
    }
    const cv = await this.filesService.createFile(
      E_SERVICES_CODE.vacancy,
      cv_file,
    );
    const data = await this.candidateRepository.create({
      ...dto,
      cv,
      photo: photo_link ? photo_link : null,
    });

    return data;
  }

  async approve(dto: UpdateCandidateDto, id: number) {
    const data = await this.candidateRepository.update(
      { ...dto, status: 1 },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
    return data;
  }

  async getById(id_request: number, status: number) {
    const data = await this.candidateRepository.findAll({
      where: {
        id_request,
        status,
      },
    });
    return data;
  }

  async decline(dto: DeclineCandidateDto, id: number) {
    const data = await this.candidateRepository.update(
      { ...dto, status: 2 },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
    return data;
  }

  async getAllByIdArray(samaccountname: string, status: number) {
    const superAdmin =
      await this.rolesService.getSuperAdminRoleBySamaccountname(samaccountname);
    const fullAdmin =
      await this.rolesService.getFullAdminRoleBySamaccountnameByService(
        samaccountname,
        E_SERVICE.VACANCY,
      );
    if (superAdmin || fullAdmin) {
      const vacancies = await this.candidateRepository.findAll({
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

      const candidates = await this.candidateRepository.findAll({
        where: {
          sono: [...new Set(sonoAll)],
          status,
        },
        include: { all: true },
      });
      return candidates;
    }
  }

  async getCandidatesByVacancy(id_request: number) {
    const data = await this.candidateRepository.findAll({
      where: {
        id_request,
        status: 0,
      },
    });
    return data;
  }
}
