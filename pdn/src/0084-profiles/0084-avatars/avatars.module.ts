import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Avatar } from './avatars.model';
import { AvatarsService } from './avatars.service';

@Module({
  providers: [AvatarsService],
  imports: [SequelizeModule.forFeature([Avatar])],
  exports: [AvatarsService],
})
export class AvatarsModule {}
