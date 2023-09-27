import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VacancyService } from './vacancy.service';
import { Vacancy } from './vacancy.model';
import { CreateVacancyDto } from './dto/create-vacancy.dto';

@ApiTags('Вакансии')
@Controller('vacancy')
export class VacancyController {
  constructor(private vacanciesService: VacancyService) {}

  //create role
  @ApiOperation({ summary: 'Создание роли пользователя' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Vacancy })
  @Post('/')
  async createVacancy(@Body() dto: CreateVacancyDto) {
    const role = await this.vacanciesService.createVacancy(dto);
    console.log(role);
    return role;
  }
  // //get roles by samaccountname
  // @ApiOperation({ summary: 'Получение ролей пользователя по учетной записи' })
  // @ApiResponse({ status: HttpStatus.OK, type: [Role] })
  // @Get('/:samaccountname')
  // async getRolesBySamaccountname(
  //   @Param('samaccountname') samaccountname: string,
  // ) {
  //   const roles = await this.rolesService.getRolesBySamaccountname(
  //     samaccountname,
  //   );
  //   return roles;
  // }

  // //get roles by samaccountname
  // @ApiOperation({
  //   summary: 'Получение ролей пользователя по учетной записи и сервису',
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: [Role] })
  // @Get('/:samaccountname/service/:service')
  // async getRolesBySamaccountnameByService(
  //   @Param('samaccountname') samaccountname: string,
  //   @Param('service') service: string,
  // ) {
  //   const roles = await this.rolesService.getRolesBySamaccountnameByService(
  //     samaccountname,
  //     Number(service),
  //   );
  //   return roles;
  // }

  // //get roles by samaccountname by status
  // @ApiOperation({
  //   summary: 'Получение ролей пользователя по учетной записи и статусу',
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: [Role] })
  // @Get('/:samaccountname/status/:status')
  // async getRolesBySamaccountnameByStatus(
  //   @Param('samaccountname') samaccountname: string,
  //   @Param('status') status: string,
  // ) {
  //   const roles = await this.rolesService.getRolesBySamaccountnameByStatus(
  //     samaccountname,
  //     Number(status),
  //   );
  //   return roles;
  // }

  // //change role
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       administrator_cn: { type: 'string' },
  //     },
  //   },
  // })
  // @ApiOperation({ summary: 'Подтверждение роли' })
  // @ApiResponse({ status: HttpStatus.OK, type: Role })
  // @UseInterceptors(NoFilesInterceptor())
  // @Patch('/:id')
  // async changeRole(
  //   @Body() dto: ChangeRoleFormdataDto,
  //   @Param('id') id: string,
  // ) {
  //   const result = `${dto.administrator_admin} одобрил запрос`;
  //   const role = await this.rolesService.changeRole(
  //     {
  //       ...dto,
  //       administrator_reject: result,
  //       administrator_status: E_STATUS.APPROVE,
  //     },
  //     +id,
  //   );
  //   return role;
  // }

  // //decline role
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       administrator_cn: { type: 'string' },
  //       administrator_reject: { type: 'string' },
  //     },
  //   },
  // })
  // @ApiOperation({ summary: 'Отклонение заявки' })
  // @ApiResponse({ status: HttpStatus.OK, type: Role })
  // @UseInterceptors(NoFilesInterceptor())
  // @Delete('/:id')
  // async declineRole(
  //   @Body() dto: DeclineRoleFormdataDto,
  //   @Param('id') id: string,
  // ) {
  //   const result = `${dto.administrator_admin} отклонил по причине: ${dto.administrator_reject}`;
  //   const role = await this.rolesService.changeRole(
  //     {
  //       ...dto,
  //       administrator_reject: result,
  //       administrator_status: E_STATUS.DECLINE,
  //     },
  //     +id,
  //   );
  //   return role;
  // }

  // //get filtered requests
  // @ApiOperation({ summary: 'Получение отфильтрованных заявок' })
  // @ApiResponse({ status: HttpStatus.OK, type: [Role] })
  // @UseInterceptors(NoFilesInterceptor())
  // @Get('/:samaccountname/search')
  // async getRequests(
  //   @Query(
  //     'filter_status',
  //     new ParseArrayPipe({ items: String, separator: ',' }),
  //   )
  //   filter_status: E_STATUS[],
  //   @Param('samaccountname') samaccountname: string,
  // ) {
  //   const filter = filter_status ? filter_status : [E_STATUS.EMPTY_FILTER];
  //   const superAdmin =
  //     await this.rolesService.getSuperAdminRoleBySamaccountname(samaccountname);
  //   if (superAdmin) {
  //     const requestsAll = await this.rolesService.getAllRequsts(filter);
  //     return requestsAll;
  //   } else {
  //     const filteredData: Role[] = [];

  //     const rolesFull = await this.rolesService.getFullRolesBySamaccountname(
  //       samaccountname,
  //     );
  //     for (let i = 0; i < rolesFull.length; i++) {
  //       const requestsByServiceBySonoFiltered =
  //         await this.rolesService.getFilteredRequestsByServiceBySono(
  //           filter,
  //           rolesFull[i].administrator_visible_sono,
  //         );

  //       for (let i = 0; i < requestsByServiceBySonoFiltered.length; i++) {
  //         if (
  //           !filteredData.some(
  //             (arr) =>
  //               arr.administrator_id ===
  //               requestsByServiceBySonoFiltered[i].administrator_id,
  //           )
  //         ) {
  //           filteredData.push(requestsByServiceBySonoFiltered[i]);
  //         }
  //       }
  //     }
  //     return filteredData;
  //   }
  // }
}
