import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vacancy } from './vacancy.model';
import { CreateVacancyDto } from './dto/create-vacancy.dto';

@Injectable()
export class VacancyService {
  constructor(
    @InjectModel(Vacancy) private vacancyRepository: typeof Vacancy,
  ) {}

  async createVacancy(dto: CreateVacancyDto) {
    const vacancy = await this.vacancyRepository.create(dto);
    return vacancy;
  }

  // async getRolesBySamaccountname(samaaccountname: string) {
  //   const roles = await this.administratorRepository.findAll({
  //     where: {
  //       [Op.and]: [
  //         { administrator_samaccountname: samaaccountname },
  //         { administrator_status: E_STATUS.APPROVE },
  //         {
  //           administrator_date_start: {
  //             [Op.or]: [
  //               {
  //                 [Op.lte]: new Date(),
  //               },
  //               {
  //                 [Op.eq]: null,
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           administrator_date_end: {
  //             [Op.or]: [
  //               {
  //                 [Op.gte]: new Date(),
  //               },
  //               {
  //                 [Op.eq]: null,
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //   });
  //   return roles;
  // }

  // async getFullRolesBySamaccountname(samaaccountname: string) {
  //   const roles = await this.administratorRepository.findAll({
  //     where: {
  //       [Op.and]: [
  //         { administrator_samaccountname: samaaccountname },
  //         { administrator_status: E_STATUS.APPROVE },
  //         { administrator_role: E_ROLE.FULL },

  //         {
  //           administrator_date_start: {
  //             [Op.or]: [
  //               {
  //                 [Op.lte]: new Date(),
  //               },
  //               {
  //                 [Op.eq]: null,
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           administrator_date_end: {
  //             [Op.or]: [
  //               {
  //                 [Op.gte]: new Date(),
  //               },
  //               {
  //                 [Op.eq]: null,
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //   });
  //   return roles;
  // }

  // async getFilteredRequestsByServiceBySono(filter: E_STATUS[], sono: string[]) {
  //   console.log(filter);
  //   const requests = await this.administratorRepository.findAll({
  //     where: {
  //       [Op.and]: [
  //         { administrator_sono: sono },
  //         { administrator_status: filter },
  //         {
  //           administrator_date_start: {
  //             [Op.or]: [
  //               {
  //                 [Op.lte]: new Date(),
  //               },
  //               {
  //                 [Op.eq]: null,
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           administrator_date_end: {
  //             [Op.or]: [
  //               {
  //                 [Op.gte]: new Date(),
  //               },
  //               {
  //                 [Op.eq]: null,
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //   });
  //   return requests;
  // }

  // async getSuperAdminRoleBySamaccountname(samaaccountname: string) {
  //   const roles = await this.administratorRepository.count({
  //     where: {
  //       [Op.and]: [
  //         { administrator_samaccountname: samaaccountname },
  //         { administrator_status: E_STATUS.APPROVE },
  //         { administrator_role: E_ROLE.FULL },
  //         { administrator_visible_sono: { [Op.contains]: ['nnnnn'] } },
  //         {
  //           administrator_date_start: {
  //             [Op.or]: [
  //               {
  //                 [Op.lte]: new Date(),
  //               },
  //               {
  //                 [Op.eq]: null,
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           administrator_date_end: {
  //             [Op.or]: [
  //               {
  //                 [Op.gte]: new Date(),
  //               },
  //               {
  //                 [Op.eq]: null,
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //   });
  //   return roles;
  // }

  // async getRolesBySamaccountnameByService(
  //   samaaccountname: string,
  //   service: number,
  // ) {
  //   const roles = await this.administratorRepository.findAll({
  //     where: {
  //       [Op.and]: [
  //         { administrator_samaccountname: samaaccountname },
  //         { administrator_service: service },
  //         { administrator_status: 1 },
  //         {
  //           administrator_date_start: {
  //             [Op.or]: [
  //               {
  //                 [Op.lte]: new Date(),
  //               },
  //               {
  //                 [Op.eq]: null,
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           administrator_date_end: {
  //             [Op.or]: [
  //               {
  //                 [Op.gte]: new Date(),
  //               },
  //               {
  //                 [Op.eq]: null,
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //   });
  //   return roles;
  // }

  // async getRolesBySamaccountnameByStatus(
  //   samaaccountname: string,
  //   status: E_STATUS,
  // ) {
  //   const roles = await this.administratorRepository.findAll({
  //     where: {
  //       administrator_status: status,
  //       [Op.or]: [
  //         { administrator_samaccountname: samaaccountname },
  //         { administrator_author_samaccountname: samaaccountname },
  //       ],
  //     },
  //   });
  //   return roles;
  // }

  // async getAllRequsts(filter: E_STATUS[]) {
  //   const roles = await this.administratorRepository.findAll({
  //     where: {
  //       administrator_status: filter,
  //     },
  //   });
  //   return roles;
  // }

  // async changeRole(dto: ChangeRoleDatabaseDto, id: number) {
  //   const role = await this.administratorRepository.update(dto, {
  //     where: {
  //       administrator_id: id,
  //     },
  //     returning: true,
  //   });
  //   return role;
  // }

  // async declineRole(dto: DeclineRoleDatabaseDto, id: number) {
  //   const role = await this.administratorRepository.update(dto, {
  //     where: {
  //       administrator_id: id,
  //     },
  //     returning: true,
  //   });
  //   return role;
  // }
}
