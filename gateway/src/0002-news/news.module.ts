import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { News } from './news.model';
import { FilesModule } from 'src/9999-files/files.module';
import { Photo } from './0002-photos/photos.model';
import { Like } from './0002-likes/likes.model';
import { PhotosModule } from './0002-photos/photos.module';
import { LikesModule } from './0002-likes/likes.module';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [
    SequelizeModule.forFeature([News, Like, Photo]),
    PhotosModule,
    FilesModule,
    LikesModule,
  ],
  exports: [NewsService],
})
export class NewsModule {}
