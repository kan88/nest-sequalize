import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile-dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Post()
  create(@Body() profileDto: CreateProfileDto) {
    return this.profilesService.createProfile(profileDto);
  }

  @Get()
  getAll() {
    return this.profilesService.getAllProfiles();
  }
}
