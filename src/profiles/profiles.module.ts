import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { Profile } from './profiles.model';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [SequelizeModule.forFeature([Profile, Role])],
  exports: [ProfilesService],
})
export class ProfilesModule {}
