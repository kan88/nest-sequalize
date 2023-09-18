import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Avatar } from './avatars.model';
import { AvatarsService } from './avatars.service';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [AvatarsService],
  imports: [SequelizeModule.forFeature([Avatar]), FilesModule],
  exports: [AvatarsService],
})
export class AvatarsModule {}
