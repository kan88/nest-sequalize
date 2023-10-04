import {
  Body,
  Controller,
  Post,
  HttpStatus,
  Patch,
  Param,
  ParseIntPipe,
  Get,
  Query,
  ParseArrayPipe,
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

@ApiTags('Вакансии')
@Controller('vacancy')
export class VacancyController {
  constructor(
    private vacanciesService: VacancyService,
    private participantService: ParticipantService,
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
  @Patch('/:id')
  async updateVacancy(
    @Body() dto: UpdateVacancyDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const role = await this.vacanciesService.updateVacancy(dto, id);
    console.log(role);
    return role;
  }

  //get vacancy by id
  @ApiOperation({ summary: 'Получение вакансии по id' })
  @ApiResponse({ status: HttpStatus.OK, type: Vacancy })
  @Get('/:id')
  async getVacancy(@Param('id', ParseIntPipe) id: number) {
    const vacancy = await this.vacanciesService.getById(id);
    return vacancy;
  }

  //get all vacancies by samaccountname and status
  @ApiOperation({ summary: 'Получение вакансии по учетке со статусом' })
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

  //create вакансии
  @ApiOperation({ summary: 'Создание участника' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Participant })
  @Post('/:id/participant')
  async createParticipant(@Body() dto: CreateParticipantDto) {
    const role = await this.participantService.createParticipant(dto);
    console.log(role);
    return role;
  }

  @ApiOperation({ summary: 'Изменение участника' })
  @ApiResponse({ status: HttpStatus.OK, type: Participant })
  @Patch('/:id/participant/:id_request')
  async updateParticipant(
    @Param('id_request', ParseIntPipe) id_request: number,
    @Body() dto: UpdateParticipantDto,
  ) {
    const participant = await this.participantService.updateParticipant(
      dto,
      id_request,
    );
    return participant;
  }

  @ApiOperation({ summary: 'удаление участника' })
  @ApiResponse({ status: HttpStatus.OK, type: Participant })
  @Delete('/:id/participant/:id_request')
  async removeParticipant(
    @Param('id_request', ParseIntPipe) id_request: number,
    @Body() dto: RemoveParticipantDto,
  ) {
    const participant = await this.participantService.removeParticipant(
      dto,
      id_request,
    );
    return participant;
  }
}
