import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { News } from './news.model';
import { FilesModule } from 'src/nnnn-files/files.module';
import { Photo } from 'src/0002-photos/photos.model';
import { PhotosModule } from 'src/0002-photos/photos.module';
import { Like } from 'src/0002-likes/likes.model';
import { LikesModule } from 'src/0002-likes/likes.module';

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
