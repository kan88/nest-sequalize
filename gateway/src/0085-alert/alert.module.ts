import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AlertController } from './alert.controller';
import { Alert } from './alert.model';

import { AlertService } from './alert.service';

@Module({
  controllers: [AlertController],
  providers: [AlertService],
  imports: [SequelizeModule.forFeature([Alert])],
  exports: [],
})
export class AlertsModule {}
