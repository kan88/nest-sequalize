import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { ProfileRole } from './model/profile-role.model';
import { CreateRoleByProfile } from './dto/create-role-by-profile';
import { ProfilesService } from 'src/profiles/profiles.service';
@ApiTags('Профили пользователей')
@Controller('roles')
export class RolesController {
  constructor(
    private rolesService: RolesService,
    private profileService: ProfilesService,
  ) {}

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  async create(@Body() roleDto: CreateRoleDto) {
    return await this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Получение всех ролей' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  async getAll() {
    return await this.rolesService.getRoles();
  }

  @ApiOperation({ summary: 'Создание роли пользователя' })
  @ApiResponse({ status: 200, type: ProfileRole })
  @Post('/:profile')
  async createRoleByProfile(
    @Body() dto: CreateRoleByProfile,
    @Param('profile') profile: string,
  ) {
    const roleId = await this.rolesService.getRoleByRole(dto.role);
    const profileId = await this.profileService.getIdByProfile(profile);
    const service = dto.service;

    return this.rolesService.createRoleByProfile({
      service,
      roleId,
      profileId,
    });
  }
}
