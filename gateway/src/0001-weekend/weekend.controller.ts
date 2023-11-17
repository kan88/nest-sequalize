import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { WeekendService } from './weekend.service';
import { CreateWeekendDto } from './dto/create-weekend.dto';
import { Weekend } from './weekend.model';
import { UpdateWeekendDto } from './dto/update-weekend.dto';
import { DeclineWeekendDto } from './dto/decline-weekend.dto';

@ApiTags('Путевки')
@Controller('weekend')
export class WeekendController {
  constructor(private weekendService: WeekendService) {}
  @ApiOperation({ summary: 'Создание путевки' })
  @ApiResponse({ status: 201, type: Weekend })
  @Post('/')
  async create(@Body() dto: CreateWeekendDto) {
    const data = await this.weekendService.create(dto);
    return data;
  }

  @ApiOperation({ summary: 'Получение путевок по статусу' })
  @ApiResponse({ status: 200, type: Weekend })
  @Get('/filter')
  async getNews(
    @Query('status') status: string,
    @Query('limit', new DefaultValuePipe(6), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ) {
    const data = await this.weekendService.getData(status, limit, offset);
    return data;
  }

  @ApiOperation({ summary: 'Бронирование и подтверждение путевки' })
  @ApiResponse({ status: 201, type: Weekend })
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateWeekendDto,
  ) {
    const data = await this.weekendService.update(dto, id);
    return data;
  }

  @ApiOperation({ summary: 'Отклонение' })
  @ApiResponse({ status: 201, type: Weekend })
  @Delete('/:id')
  async decline(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DeclineWeekendDto,
  ) {
    const data = await this.weekendService.decline(dto, id);
    return data;
  }

  @ApiOperation({ summary: 'Удаление' })
  @ApiResponse({ status: 201, type: Weekend })
  @Delete('/:id/status/4')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.weekendService.remove(id);
    return data;
  }
}
