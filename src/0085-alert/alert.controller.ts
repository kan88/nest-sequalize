import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Alert } from './alert.model';

import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';

@ApiTags('Уведомления')
@Controller('alert')
export class AlertController {
  constructor(private alertService: AlertService) {}
  @ApiOperation({ summary: 'Создание уведомления' })
  @ApiResponse({ status: 201, type: Alert })
  @Post('/')
  async create(@Body() dto: CreateAlertDto) {
    const data = await this.alertService.create(dto);
    return data;
  }

  @ApiOperation({ summary: 'Получение уведомлений по аккаунту' })
  @ApiResponse({ status: 200, type: [Alert] })
  @Get('/samaccountname/:samaccountname')
  async getByAccount(@Param('samaccountname') samaccountname: string) {
    const data = await this.alertService.getByAccount(samaccountname);
    this.alertService.updateByAccount(samaccountname);
    return data;
  }

  @ApiOperation({
    summary: 'Получение количества новых уведомлений по аккаунту',
  })
  @ApiResponse({ status: 200, type: [Alert] })
  @Get('/samaccountname/:samaccountname/new')
  async getNewByAccount(@Param('samaccountname') samaccountname: string) {
    const data = await this.alertService.getNewByAccount(samaccountname);
    return data;
  }
}
