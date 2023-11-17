import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from './photos.model';
import { PhotosService } from './photo.service';
CacheModule

@Module({
  providers: [PhotosService],
  imports: [SequelizeModule.forFeature([Photo])],
  exports: [PhotosService],
})
export class PhotosModule {}
