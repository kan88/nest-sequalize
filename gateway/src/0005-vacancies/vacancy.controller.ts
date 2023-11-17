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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VacancyService } from './vacancy.service';
import { Vacancy } from './vacancy.model';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { E_STATUS } from 'src/types/ENUMS';
import { ParticipantService } from './0005-participants/participant.service';
import { AddressService } from './0005-addresses/address.service';
import { ScheduleService } from './0005-schedules/schedule.service';
import { Participant } from './0005-participants/participant.model';
import { CreateParticipantDto } from './0005-participants/dto/create-participant.dto';
import { UpdateParticipantDto } from './0005-participants/dto/update-participant.dto';
import { RemoveParticipantDto } from './0005-participants/dto/remove-participant.dto';
import { Address } from './0005-addresses/address.model';
import { CreateAddressDto } from './0005-addresses/dto/create-address.dto';
import { UpdateAddressDto } from './0005-addresses/dto/update-address.dto';
import { RemoveAddressDto } from './0005-addresses/dto/remove-address.dto';
import { Schedule } from './0005-schedules/schedule.model';
import { CreateScheduleDto } from './0005-schedules/dto/create-schedule.dto';
import { UpdateScheduleDto } from './0005-schedules/dto/update-schedule.dto';
import { RemoveScheduleDto } from './0005-schedules/dto/remove-schedule.dto';
import { Candidate, ICandidate } from './0005-candidates/candidate.model';
import { CandidateService } from './0005-candidates/candidate.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { DeclineCandidateDto } from './0005-candidates/dto/decline-candidate.dto';
import { UpdateCandidateDto } from './0005-candidates/dto/update-candidate.dto';
@ApiTags('Вакансии')
@Controller('vacancy')
export class VacancyController {
  constructor(
    private vacanciesService: VacancyService,
    private participantService: ParticipantService,
    private addressService: AddressService,
    private scheduleService: ScheduleService,
    private candidateService: CandidateService,
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

  //participant

  @ApiOperation({ summary: 'Создание отклика' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        first_name: {
          type: 'string',
        },
        second_name: {
          type: 'string',
        },
        date_of_birhday: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        priority_contact: {
          type: 'string',
        },
        mobile_phone: {
          type: 'string',
        },
        mail: {
          type: 'string',
        },
        third_name: {
          type: 'string',
        },
        sono: {
          type: 'string',
        },
        telegramm: {
          type: 'string',
        },
        whatsapp: {
          type: 'string',
        },
        body: {
          type: 'string',
        },
        priority_address: {
          type: 'string',
        },
        cv: {
          type: 'string',
          format: 'binary',
        },
        photo: {
          type: 'string',
          format: 'binary',
          required: ['true'],
        },
      },
    },
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: Candidate })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cv', maxCount: 1 },
      { name: 'photo', maxCount: 1 },
    ]),
  )
  @Post('/:id_vacancy/candidate')
  async createCandidate(
    @Param('id_vacancy', ParseIntPipe) id_request: number,
    @Body() dto: Omit<ICandidate<Express.Multer.File>, 'id_request'>,
    @UploadedFiles()
    files: { cv?: Express.Multer.File[]; photo?: Express.Multer.File[] },
  ) {
    const participant = await this.candidateService.create(
      { ...dto, id_request },
      files.cv[0],
      files.photo ? files.photo[0] : null,
    );
    return participant;
  }
  @ApiOperation({ summary: 'Отклонение кандидата' })
  @ApiResponse({ status: HttpStatus.OK, type: Candidate })
  @Delete('/:id_vacancy/candidate/:id_candidate')
  async declineCandidate(
    @Param('id_candidate', ParseIntPipe) id: number,
    @Body() dto: DeclineCandidateDto,
  ) {
    const data = await this.candidateService.decline(dto, id);
    return data;
  }
  @ApiOperation({ summary: 'Подтверждение кандидата' })
  @ApiResponse({ status: HttpStatus.OK, type: Candidate })
  @Patch('/:id_vacancy/candidate/:id_candidate')
  async approveCandidate(
    @Param('id_candidate', ParseIntPipe) id: number,
    @Body() dto: UpdateCandidateDto,
  ) {
    const data = await this.candidateService.approve(dto, id);
    return data;
  }
  @ApiOperation({ summary: 'Получение кандидатов по id вакансии и статусу' })
  @ApiResponse({ status: HttpStatus.OK, type: Candidate })
  @Get('/:id_vacancy/candidate/status/:status')
  async getByIdRequest(
    @Param('id_vacancy', ParseIntPipe) id: number,
    @Param('status', ParseIntPipe) status: number,
  ) {
    const data = await this.candidateService.getById(id, status);
    return data;
  }

  //get all candidates by samaccountname and status
  @ApiOperation({ summary: 'Получение откликов по учетке со статусом' })
  @ApiResponse({ status: HttpStatus.OK, type: [Candidate] })
  @Get('/samaccountname/:samaccountname/candidate/status/:status')
  async getCandidatesBySamaccountname(
    @Param('samaccountname') samaccountname: string,
    @Param('status', ParseIntPipe)
    status: E_STATUS,
  ) {
    const candidates = await this.candidateService.getAllByIdArray(
      samaccountname,
      status,
    );
    return candidates;
  }
}
