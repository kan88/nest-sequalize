import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Role } from './roles.model';
import { ProfilesService } from 'src/profiles/profiles.service';
import { CreateRoleBySamaccountname } from './dto/create-role-by-samaaccountname';

@ApiTags('Роли пользователей')
@Controller('roles')
export class RolesController {
  constructor(
    private rolesService: RolesService,
    private profileService: ProfilesService,
  ) {}

  @ApiOperation({ summary: 'Получение всех ролей пользователей' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  async getAll() {
    return await this.rolesService.getRoles();
  }

  @ApiOperation({ summary: 'Создание роли пользователя' })
  @ApiResponse({ status: 200, type: Role })
  @Post('/:samaccountname')
  async createRoleByProfile(
    @Body() dto: CreateRoleBySamaccountname,
    @Param('samaccountname') samaccountname: string,
  ) {
    return this.rolesService.createRoleByProfile({
      samaccountname,
      ...dto,
    });
  }
}
