import {
  Body,
  Controller,
  Post,
  HttpStatus,
  Patch,
  Param,
  ParseIntPipe,
  Get,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VacancyService } from './vacancy.service';
import { Vacancy } from './vacancy.model';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { E_STATUS } from 'src/types/ENUMS';
import { ParticipantService } from 'src/0005-participants/participant.service';
import { CreateParticipantDto } from 'src/0005-participants/dto/create-participant.dto';
import { Participant } from 'src/0005-participants/participant.model';
import { UpdateParticipantDto } from 'src/0005-participants/dto/update-participant.dto';
import { RemoveParticipantDto } from 'src/0005-participants/dto/remove-participant.dto';
import { CreateAddressDto } from 'src/0005-addresses/dto/create-address.dto';
import { AddressService } from 'src/0005-addresses/address.service';
import { UpdateAddressDto } from 'src/0005-addresses/dto/update-address.dto';
import { RemoveAddressDto } from 'src/0005-addresses/dto/remove-address.dto';
import { UpdateScheduleDto } from 'src/0005-schedules/dto/update-schedule.dto';
import { CreateScheduleDto } from 'src/0005-schedules/dto/create-schedule.dto';
import { Schedule } from 'src/0005-schedules/schedule.model';
import { ScheduleService } from 'src/0005-schedules/schedule.service';
import { RemoveScheduleDto } from 'src/0005-schedules/dto/remove-schedule.dto';
import { Address } from 'src/0005-addresses/address.model';

@ApiTags('Вакансии')
@Controller('vacancy')
export class VacancyController {
  constructor(
    private vacanciesService: VacancyService,
    private participantService: ParticipantService,
    private addressService: AddressService,
    private scheduleService: ScheduleService,
  ) {}

  //create вакансии
  @ApiOperation({ summary: 'Создание вакансии' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Vacancy })
  @Post('/')
  async createVacancy(@Body() dto: CreateVacancyDto) {
    const role = await this.vacanciesService.createVacancy(dto);
    console.log(role);
    return role;
  }

  //get all вакансии
  @ApiOperation({ summary: 'Получение всех вакансий' })
  @ApiResponse({ status: HttpStatus.OK, type: [Vacancy] })
  @Get('/')
  async getVacancies() {
    const vacancies = await this.vacanciesService.getAllVacancies();
    return vacancies;
  }

  //update vacancy
  @ApiOperation({ summary: 'Изменение вакансии' })
  @ApiResponse({ status: HttpStatus.OK, type: Vacancy })
  @Patch('/:id_vacancy')
  async updateVacancy(
    @Body() dto: UpdateVacancyDto,
    @Param('id_vacancy', ParseIntPipe) id: number,
  ) {
    const role = await this.vacanciesService.updateVacancy(dto, id);
    console.log(role);
    return role;
  }

  //get vacancy by id
  @ApiOperation({ summary: 'Получение вакансии по id' })
  @ApiResponse({ status: HttpStatus.OK, type: Vacancy })
  @Get('/:id_vacancy')
  async getVacancy(@Param('id_vacancy', ParseIntPipe) id: number) {
    const vacancy = await this.vacanciesService.getById(id);
    return vacancy;
  }

  //get all vacancies by samaccountname and status
  @ApiOperation({ summary: 'Получение всех заявок по учетке со статусом' })
  @ApiResponse({ status: HttpStatus.OK, type: Vacancy })
  @Get('/samaccountname/:samaccountname/status/:status')
  async getVacanciesBySamaccountname(
    @Param('samaccountname') samaccountname: string,
    @Param('status', ParseIntPipe)
    status: E_STATUS,
  ) {
    const vacancies =
      await this.vacanciesService.getVacanciesBySamaccountnameWithFilter(
        samaccountname,
        status,
      );
    return vacancies;
  }

  //participant

  @ApiOperation({ summary: 'Создание участника' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Participant })
  @Post('/:id_vacancy/participant')
  async createParticipant(
    @Param('id_vacancy', ParseIntPipe) id_vacancy: number,
    @Body() dto: CreateParticipantDto,
  ) {
    const participant = await this.participantService.createParticipant(dto);
    return participant;
  }

  @ApiOperation({ summary: 'Изменение участника' })
  @ApiResponse({ status: HttpStatus.OK, type: Participant })
  @Patch('/:id_vacancy/participant/:id')
  async updateParticipant(
    @Param('id', ParseIntPipe) id: number,
    @Param('id_vacancy', ParseIntPipe) id_vacancy: number,
    @Body() dto: UpdateParticipantDto,
  ) {
    const participant = await this.participantService.updateParticipant(
      dto,
      id,
    );
    return participant;
  }

  @ApiOperation({ summary: 'Удаление участника' })
  @ApiResponse({ status: HttpStatus.OK, type: Participant })
  @Delete('/:id_vacancy/participant/:id')
  async removeParticipant(
    @Param('id', ParseIntPipe) id: number,
    @Param('id_vacancy', ParseIntPipe) id_vacancy: number,
    @Body() dto: RemoveParticipantDto,
  ) {
    const participant = await this.participantService.removeParticipant(
      dto,
      id,
    );
    return participant;
  }

  //get all vacancies by samaccountname and status
  @ApiOperation({ summary: 'Получение моих заявок по учетке со статусом' })
  @ApiResponse({ status: HttpStatus.OK, type: Vacancy })
  @Get('/participant/:samaccountname/status/:status')
  async getRequestsBySamaccountname(
    @Param('samaccountname') samaccountname: string,
    @Param('status', ParseIntPipe)
    status: E_STATUS,
  ) {
    const myRequestsId = await this.participantService.getParticipants(
      samaccountname,
    );
    const MyRequestsIdArray = [...myRequestsId.map((id) => id.id_request)];
    console.log(MyRequestsIdArray);

    const requests = await this.vacanciesService.getAllByIdArray(
      MyRequestsIdArray,
      status,
    );
    return requests;
  }

  //addresses

  @ApiOperation({ summary: 'Создание адреса' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Address })
  @Post('/:id_vacancy/address')
  async createaddress(
    @Param('id_vacancy', ParseIntPipe) id_vacancy: number,
    @Body() dto: CreateAddressDto,
  ) {
    const address = await this.addressService.createAddress(dto);
    return address;
  }

  @ApiOperation({ summary: 'Изменение адреса' })
  @ApiResponse({ status: HttpStatus.OK, type: Address })
  @Patch('/:id_vacancy/address/:id')
  async updateAddress(
    @Param('id_vacancy', ParseIntPipe) id_vacancy: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAddressDto,
  ) {
    const address = await this.addressService.updateAddress(dto, id);
    return address;
  }

  @ApiOperation({ summary: 'Удаление адреса' })
  @ApiResponse({ status: HttpStatus.OK, type: Address })
  @Delete('/:id_vacancy/address/:id')
  async removeAddress(
    @Param('id_vacancy', ParseIntPipe) id_vacancy: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RemoveAddressDto,
  ) {
    const address = await this.addressService.removeAddress(dto, id);
    return address;
  }

  //schedules

  @ApiOperation({ summary: 'Создание графика' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Schedule })
  @Post('/:id_vacancy/schedule')
  async createSchedule(
    @Param('id_vacancy', ParseIntPipe) id_vacancy: number,
    @Body() dto: CreateScheduleDto,
  ) {
    const schedule = await this.scheduleService.createSchedule(dto);
    return schedule;
  }

  @ApiOperation({ summary: 'Изменение графика' })
  @ApiResponse({ status: HttpStatus.OK, type: Schedule })
  @Patch('/:id_vacancy/schedule/:id')
  async updateSchedule(
    @Param('id_vacancy', ParseIntPipe) id_vacancy: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateScheduleDto,
  ) {
    const schedule = await this.scheduleService.updateSchedule(dto, id);
    return schedule;
  }

  @ApiOperation({ summary: 'Удаление графика' })
  @ApiResponse({ status: HttpStatus.OK, type: Schedule })
  @Delete('/:id_vacancy/schedule/:id')
  async removeSchedule(
    @Param('id_vacancy', ParseIntPipe) id_vacancy: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RemoveScheduleDto,
  ) {
    const schedule = await this.scheduleService.removeSchedule(dto, id);
    return schedule;
  }
}
