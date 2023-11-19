import {
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
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

import { PhoneService } from './phone.service';
import { User } from 'src/9999-users/user.model';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('Телефонный справочник')
@Controller('phone')
export class PhoneController {
  constructor(
    private phoneService: PhoneService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'department', required: false })
  @ApiQuery({ name: 'sono', required: false })
  @ApiQuery({ name: 'company', required: false })
  @Get('')
  async get(
    @Query('search') search?: string | null,
    @Query('department') department?: string | null,
    @Query('sono') sono?: string | null,
    @Query('company') company?: string | null,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset?: number,
  ) {
    const profile = await this.phoneService.find(
      search,
      department,
      sono,
      company,
      limit,
      offset,
    );
    console.log('redis set');
    await this.cacheManager.set(
      'test1',
      JSON.stringify({ body: 'test' }),
      3000,
    );
    return await this.cacheManager.get('test1');
    console.log('hello');
    return profile;
  }
}
