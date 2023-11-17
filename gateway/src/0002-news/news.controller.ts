import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  HttpStatus,
  UploadedFiles,
  Param,
  ParseIntPipe,
  Patch,
  Get,
  Query,
  DefaultValuePipe,
  Delete,
  ParseArrayPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

import { News } from './news.model';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { FilesService } from 'src/9999-files/files.service';
import { E_SERVICES_CODE } from 'src/types/ENUMS';
import { UpdateNewsDto } from './dto/update-news.dto';
import { LikesService } from './0002-likes/likes.service';
import { PhotosService } from './0002-photos/photo.service';
import { UpdateLikeDto } from './0002-likes/dto/update-like.dto';
import { Like } from './0002-likes/likes.model';
import { Photo } from './0002-photos/photos.model';

@ApiTags('Новости')
@Controller('news')
export class NewsController {
  constructor(
    private newsService: NewsService,
    private fileService: FilesService,
    private likeService: LikesService,
    private photosService: PhotosService,
  ) {}

  @ApiOperation({ summary: 'Получение новостей по статусу' })
  @ApiResponse({ status: 200, type: News })
  @Get('/filter')
  async getNews(
    @Query('status', new DefaultValuePipe(1), ParseIntPipe) status: number,
    @Query('limit', new DefaultValuePipe(6), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ) {
    console.log('here');
    const data = await this.newsService.getNews(status, limit, offset);
    return data;
  }

  @ApiOperation({ summary: 'Получение новостей по статусу и по аккаунту' })
  @ApiResponse({ status: 200, type: News })
  @Get('/samaccountname/:samaccountname/filter')
  async getMyNews(
    @Param('samaccountname') samaccountname: string,
    @Query('status', new ParseArrayPipe({ items: Number, separator: ',' }))
    status: number[],
    @Query('limit', new DefaultValuePipe(6), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ) {
    const data = await this.newsService.getMyNews(
      samaccountname,
      status,
      limit,
      offset,
    );

    return data;
  }

  @ApiOperation({ summary: 'Создание новости' })
  @ApiResponse({ status: 201, type: News })
  @Post('/')
  async createNews(@Body() dto: CreateNewsDto) {
    const data = await this.newsService.createNews(dto);
    return data;
  }

  @ApiOperation({ summary: 'Получение новости по id' })
  @ApiResponse({ status: 200, type: News })
  @Get('/:id')
  async getNewsById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.newsService.getNewsById(id);
    return data;
  }

  @ApiOperation({ summary: 'Изменение новости' })
  @ApiResponse({ status: 200, type: News })
  @Patch('/:id')
  async updateNews(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNewsDto,
  ) {
    const data = await this.newsService.updateNews(dto, id);
    return data;
  }

  @ApiOperation({ summary: 'Удаление новости' })
  @ApiResponse({ status: 200, type: News })
  @Delete('/:id')
  async deleteNews(@Param('id', ParseIntPipe) id: number) {
    const data = await this.newsService.deleteNews(id);
    return data;
  }

  @ApiOperation({ summary: 'Инкрементирование просмотров' })
  @ApiResponse({ status: 200, type: News })
  @Patch('/:id/views')
  async updateViews(@Param('id', ParseIntPipe) id: number) {
    const data = await this.newsService.updateViews(id);
    return data;
  }

  @ApiOperation({ summary: 'Изменение лайков' })
  @ApiResponse({ status: 200, type: News })
  @Patch('/:id/likes')
  async update(
    @Body() dto: UpdateLikeDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.likeService.updateLike(dto, id);
    if (data[1] === false) {
      dto.news_like === '0'
        ? await this.newsService.decrementLikes(id)
        : await this.newsService.incrementLikes(id);
    }
    return data;
  }

  @ApiOperation({ summary: 'Получение лайков по учетной записи' })
  @ApiResponse({ status: 200, type: Like })
  @Get('/likes/samaccountname/:samaccountname')
  async getLikesByAccount(@Param('samaccountname') samaccountname: string) {
    const data = await this.likeService.getLikesByAccount(samaccountname);

    return data;
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
        video: {
          type: 'string',
          format: 'binary',
        },
        pdf: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Добавление одного файла: аватара, видео или пдф',
  })
  @ApiResponse({ status: 200, type: News })
  @Post('/:id/upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'video', maxCount: 1 },
      { name: 'pdf', maxCount: 1 },
      { name: 'avatar', maxCount: 1 },
      { name: 'image', maxCount: 10 },
    ]),
  )
  async createUpload(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File;
      pdf?: Express.Multer.File;
      video?: Express.Multer.File;
      image?: Express.Multer.File;
    },
  ) {
    if (files.avatar) {
      const src = await this.fileService.createFile(
        E_SERVICES_CODE.news,
        files.avatar[0],
      );
      const data = await this.newsService.updateSrc('avatar', src, id);
      return data;
    }
    if (files.pdf) {
      const src = await this.fileService.createFile(
        E_SERVICES_CODE.news,
        files.pdf[0],
      );
      const data = await this.newsService.updateSrc('pdf', src, id);
      return data;
    }
    if (files.video) {
      const src = await this.fileService.createFile(
        E_SERVICES_CODE.news,
        files.video[0],
      );
      const data = await this.newsService.updateSrc('video', src, id);
      return data;
    }
    if (files.image) {
      console.log('here');
      const src = await this.fileService.createFile(
        E_SERVICES_CODE.news,
        files.image[0],
      );
      const data = await this.photosService.createPhoto({
        news_id: id,
        photos: src,
      });
      return data;
    }
  }
  @Delete('/:id/image/:id_image')
  @ApiOperation({ summary: 'Удаление фотографии' })
  @ApiResponse({ status: 200, type: Photo })
  async removePhoto(@Param('id_image', ParseIntPipe) id_image: number) {
    const data = await this.photosService.removePhoto(id_image);
    return data;
  }

  @Delete('/:id/pdf')
  @ApiOperation({ summary: 'Удаление pdf' })
  @ApiResponse({ status: 200, type: News })
  async removePdf(@Param('id', ParseIntPipe) id: number) {
    const data = await this.newsService.removePdf(id);
    return data;
  }

  @Delete('/:id/video')
  @ApiOperation({ summary: 'Удаление video' })
  @ApiResponse({ status: 200, type: News })
  async removeVideo(@Param('id', ParseIntPipe) id: number) {
    const data = await this.newsService.removeVideo(id);
    return data;
  }
}
