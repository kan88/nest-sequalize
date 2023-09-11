import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfilesService } from './profiles.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Profile } from './profiles.model';

@ApiTags('Профили пользователей')
@Controller('profile')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @ApiOperation({ summary: 'Получение или создание пользователя' })
  @ApiResponse({ status: 200, type: Profile })
  @Get(':samaccountname')
  async getProfileOrCreateBySamaccountname(
    @Param('samaccountname') samaccountname: string,
  ) {
    const profile =
      await this.profilesService.getProfileOrCreateBySamaccountname(
        samaccountname,
      );
    return profile;
  }
}
