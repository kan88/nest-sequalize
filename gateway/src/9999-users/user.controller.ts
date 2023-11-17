import {
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HeaderObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

import { User } from 'src/9999-users/user.model';
import { UserService } from './user.service';

@ApiTags('Поиск Active directory')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 201, type: User })
  @Get()
  async post(@Headers() headers: HeaderObject) {
    const ip_user = headers['x-real-ad'];
    const data = await this.userService.findUser(ip_user);
    return data;
  }

  @ApiOperation({ summary: 'Получение отделов' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiQuery({ name: 'search', required: false })
  @Get('departments')
  async getDepartments(@Query('search') search?: string) {
    const departments = await this.userService.findDepartments(search);
    return departments;
  }

  @ApiOperation({ summary: 'Получение должностей' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiQuery({ name: 'search', required: false })
  @Get('titles')
  async getTitles(@Query('search') search?: string) {
    const titles = await this.userService.findTitles(search);
    return titles;
  }

  @ApiOperation({ summary: 'Получение филиалов' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiQuery({ name: 'search', required: false })
  @Get('companies')
  async getCompanies(@Query('search') search?: string) {
    const titles = await this.userService.findCompanies(search);
    return titles;
  }
}
