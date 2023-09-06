import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Role } from './roles.model';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { CreateRoleDatabaseDto } from './dto/create-role-database.dto';
import { ChangeRoleDatabaseDto } from './dto/change-role-database.dto';

@ApiTags('Роли пользователей')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  //create role
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        administrator_cn: { type: 'string' },
        administrator_samaccountname: { type: 'string' },
        administrator_company: { type: 'string' },
        administrator_department: { type: 'string' },
        administrator_title: { type: 'string' },
        administrator_service: { type: 'string' },
        administrator_role: { type: 'string' },
        administrator_sono: { type: 'string' },
        administrator_comments: { type: 'string' },
        administrator_visible_sono: { type: 'string[]' },
        administrator_telephone_number: { type: 'string' },
        administrator_mobile_number: { type: 'string | null' },
        administrator_mail: { type: 'string' },
        administrator_author_samaccountname: { type: 'string' },
        administrator_author_cn: { type: 'string' },
        administrator_author_title: { type: 'string' },
        administrator_author_department: { type: 'string' },
        administrator_author_company: { type: 'string' },
        administrator_author_telephone_number: { type: 'string' },
        administrator_author_mail: { type: 'string' },
        administrator_author_sono: { type: 'string' },
      },
    },
  })
  @ApiOperation({ summary: 'Создание роли пользователя' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Role })
  @UseInterceptors(NoFilesInterceptor())
  @Post('/')
  async createRole(@Body() dto: CreateRoleDatabaseDto) {
    const role = await this.rolesService.createRole({
      ...dto,
      administrator_service: +dto.administrator_service,
      administrator_role: +dto.administrator_role,
    });
    console.log(role);
    return role;
  }
  //get roles by samaccountname
  @ApiOperation({ summary: 'Получение ролей пользователя по учетной записи' })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @Get('/:samaccountname')
  async getRolesBySamaccountname(
    @Param('samaccountname') samaccountname: string,
  ) {
    const roles = await this.rolesService.getRolesBySamaccountname(
      samaccountname,
    );
    return roles;
  }

  //change role
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        administrator_status: { type: 'string' },
        administrator_cn: { type: 'string' },
        administrator_reject: { type: 'string | null' },
      },
    },
  })
  @ApiOperation({ summary: 'Изменение статуса роли' })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @UseInterceptors(NoFilesInterceptor())
  @Patch('/:id')
  async changeRole(
    @Body() dto: ChangeRoleDatabaseDto,
    @Param('id') id: string,
  ) {
    let result: string;
    dto.administrator_reject
      ? (result = `${dto.administrator_cn} отклонил по причине: ${dto.administrator_reject}`)
      : (result = `${dto.administrator_cn} одобрил запрос`);
    const role = await this.rolesService.changeRole(
      {
        ...dto,
        administrator_reject: result,
        administrator_status: +dto.administrator_status,
      },
      +id,
    );
    return role;
  }
}
