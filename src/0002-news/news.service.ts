import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { where } from 'sequelize';
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
      include: { all: true },
    });
    return data;
  }

  async getNews(status = 1, limit = 6, offset = 0) {
    const data = await this.newsRepository.findAndCountAll({
      where: { status },
      order: [['id', 'DESC']],
      limit: limit > 50 ? 50 : limit,
      offset,
      include: { all: true },
    });
    return data;
  }

  async updateViews(id: number) {
    const data = await this.newsRepository.findOne({ where: { id } });
    const dataUpdate = data.increment('views');
    return dataUpdate;
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
