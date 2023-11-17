import { Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HeaderObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Visit } from './0013-visits/visits.model';

import { Statistic } from './statistics.model';
import { StatisticsService } from './statistics.service';

@ApiTags('Статистика')
@Controller('statistic')
export class StatisticsController {
  constructor(private statisticService: StatisticsService) {}

  @ApiOperation({ summary: 'Получение статистики за последние 50 дней' })
  @ApiResponse({ status: 200, type: [Statistic] })
  @Get('/')
  async getStatistic() {
    const data = await this.statisticService.getLastFifty();
    return data;
  }
  @ApiOperation({ summary: 'Новый визит' })
  @ApiResponse({ status: 201, type: Visit })
  @Post()
  async post(@Headers() headers: HeaderObject) {
    const ip_address = headers['x-real-ip'];
    const ip_url = headers['referer'];
    const ip_user = headers['x-real-ad'];
    const data = await this.statisticService.post({
      ip_address,
      ip_url,
      ip_user,
    });
    return data;
  }
}
