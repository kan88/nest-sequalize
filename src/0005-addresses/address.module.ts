import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from './address.model';
import { AddressService } from './address.service';

@Module({
  providers: [AddressService],
  controllers: [],
  imports: [SequelizeModule.forFeature([Address])],
  exports: [AddressService],
})
export class AddressModule {}
