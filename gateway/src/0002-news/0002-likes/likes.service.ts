import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './likes.model';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like) private likesRepository: typeof Like) {}

  async updateLike(dto: UpdateLikeDto, id: number) {
    const data = await this.likesRepository.findOrCreate({
      where: {
        news_id: id,
        news_user: dto.news_user,
      },
    });
    if (data[1] == false) {
      const data = await this.likesRepository.update(dto, {
        where: {
          news_id: id,
          news_user: dto.news_user,
        },
        returning: true,
      });
      return data;
    }
    return data;
  }

  async getLikesByAccount(samaccountname: string) {
    const data = await this.likesRepository.findAll({
      where: { news_user: samaccountname },
    });
    return data;
  }
}
