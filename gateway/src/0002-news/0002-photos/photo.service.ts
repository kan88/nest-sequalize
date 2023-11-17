import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TPhoto } from './interfaces/create-photo';
import { Photo } from './photos.model';

@Injectable()
export class PhotosService {
  constructor(@InjectModel(Photo) private photosRepository: typeof Photo) {}

  async createPhoto(photo: TPhoto) {
    const data = await this.photosRepository.create(photo);
    return data;
  }

  async removePhoto(id: number) {
    const data = await this.photosRepository.update(
      { status: false },
      { where: { id } },
    );
    return data;
  }
}
