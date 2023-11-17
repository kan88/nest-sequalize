import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './0002-likes/likes.model';
import { Photo } from './0002-photos/photos.model';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './news.model';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News) private newsRepository: typeof News) {}

  async createNews(dto: CreateNewsDto) {
    const data = await this.newsRepository.create(dto);
    return data;
  }

  async getNewsById(id: number) {
    const data = await this.newsRepository.findOne({
      where: { id },
      include: [
        { model: Photo, as: 'images' },
        {
          model: Like,
          as: 'is_liked',
          where: {
            news_like: '1',
          },
          attributes: ['news_user'],
          required: false,
        },
      ],
    });
    return data;
  }

  async getNews(status = 1, limit = 6, offset = 0) {
    const data = await this.newsRepository.findAndCountAll({
      where: { status },
      nest: false,
      order: [['id', 'DESC']],
      limit: limit > 50 ? 50 : limit,
      offset,
      include: [
        { model: Photo, as: 'images', separate: true },
        {
          model: Like,
          as: 'is_liked',
          where: {
            news_like: '1',
          },
          attributes: ['news_user'],
          required: false,
          separate: true,
        },
      ],
    });
    return data;
  }

  async getMyNews(
    account_number: string,
    status: number[],
    limit = 6,
    offset = 0,
  ) {
    const data = await this.newsRepository.findAndCountAll({
      where: [{ status }, { account_number }],
      nest: false,
      order: [['id', 'DESC']],
      limit: limit > 50 ? 50 : limit,
      offset,
      include: [
        { model: Photo, as: 'images', separate: true },
        {
          model: Like,
          as: 'is_liked',
          where: {
            news_like: '1',
          },
          attributes: ['news_user'],
          required: false,
          separate: true,
        },
      ],
    });
    return data;
  }

  async updateViews(id: number) {
    const data = await this.newsRepository.findOne({ where: { id } });
    const dataUpdate = data.increment('views');
    return dataUpdate;
  }

  async deleteNews(id: number) {
    const data = await this.newsRepository.update(
      { status: 3 },
      { where: { id } },
    );
    return data;
  }

  async removeVideo(id: number) {
    const data = await this.newsRepository.update(
      { video: null },
      { where: { id } },
    );
    return data;
  }

  async removePdf(id: number) {
    const data = await this.newsRepository.update(
      { pdf: null },
      { where: { id } },
    );
    return data;
  }

  async incrementLikes(id: number) {
    const data = await this.newsRepository.findOne({ where: { id } });
    const dataUpdate = data.increment('likes');
    return dataUpdate;
  }

  async decrementLikes(id: number) {
    const data = await this.newsRepository.findOne({ where: { id } });
    const dataUpdate = data.decrement('likes');
    return dataUpdate;
  }

  async updateNews(dto: UpdateNewsDto, id: number) {
    const data = await this.newsRepository.update(dto, {
      where: { id },
      returning: true,
    });
    return data;
  }

  async updateSrc(type: string, src: string, id: number) {
    switch (type) {
      case 'avatar':
        const avatar = await this.newsRepository.update(
          { avatar: src },
          { where: { id }, returning: true },
        );
        return avatar;
      case 'video':
        const video = await this.newsRepository.update(
          { video: src },
          { where: { id }, returning: true },
        );
        return video;
      case 'pdf':
        const pdf = await this.newsRepository.update(
          { pdf: src },
          { where: { id }, returning: true },
        );
        return pdf;
    }
  }
}
