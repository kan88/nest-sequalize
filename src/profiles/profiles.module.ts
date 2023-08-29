import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profiles.model';
import { Role } from 'src/roles/roles.model';
import { ProfileRole } from '../roles/model/profile-role.model';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [SequelizeModule.forFeature([Profile, Role, ProfileRole])],
  exports: [ProfilesService],
})
export class ProfilesModule {}
