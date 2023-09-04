import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { Profile } from 'src/profiles/profiles.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, Profile]), ProfilesModule],
})
export class RolesModule {}
