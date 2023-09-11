import { Module } from '@nestjs/common';
import { AdministratorController } from './administrator.controller';
import { AdministratorService } from './administrator.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './administrator.model';

@Module({
  controllers: [AdministratorController],
  providers: [AdministratorService],
  imports: [SequelizeModule.forFeature([Role])],
})
export class RolesModule {}
