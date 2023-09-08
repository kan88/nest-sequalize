import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/administrator.model';
import { Profile } from './profiles.model';
import { RolesModule } from 'src/roles/administrator.module';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [SequelizeModule.forFeature([Profile, Role]), RolesModule],
  exports: [ProfilesService],
})
export class ProfilesModule {}
