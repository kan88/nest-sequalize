import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/9999-users/user.model';
import { UserModule } from 'src/9999-users/user.module';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';
// import { CacheModule } from '@nestjs/cache-manager';
// import * as redisStore from 'cache-manager-redis-store';

@Module({
  controllers: [PhoneController],
  providers: [PhoneService],
  imports: [SequelizeModule.forFeature([User]), UserModule],
  exports: [],
})
export class PhoneModule {}
