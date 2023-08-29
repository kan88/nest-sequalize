import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { Profile } from 'src/profiles/profiles.model';
import { ProfileRole } from 'src/roles/model/profile-role.model';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Role, Profile, ProfileRole]),
    ProfilesModule,
  ],
})
export class RolesModule {}
