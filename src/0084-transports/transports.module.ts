import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transport } from './transports.model';
import { TransportsService } from './transports.service';

@Module({
  providers: [TransportsService],
  imports: [SequelizeModule.forFeature([Transport])],
  exports: [TransportsService],
})
export class TransportsModule {}
