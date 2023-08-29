import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile-dto';
import { ProfilesService } from './profiles.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Profile } from './profiles.model';
@ApiTags('Профили пользователей')
@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: Profile })
  @Post()
  create(@Body() profileDto: CreateProfileDto) {
    return this.profilesService.createProfile(profileDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [Profile] })
  @Get()
  getAll() {
    return this.profilesService.getAllProfiles();
  }
}
