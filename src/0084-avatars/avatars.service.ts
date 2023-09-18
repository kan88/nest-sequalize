import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAvatarDatabaseDto } from './dto/create-avatar-database.dto';
import { Avatar } from './avatars.model';
import { UpdateAvatarDatabaseDto } from './dto/update-avatar-database.dto';
import { DeleteAvatarDatabaseDto } from './dto/delete-avatar-database.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class AvatarsService {
  constructor(
    @InjectModel(Avatar) private avatarRepository: typeof Avatar,
    private fileService: FilesService,
  ) {}
  async createAvatar(profile_id: number, file: Express.Multer.File) {
    const avatar_src = await this.fileService.createFile(file);
    const avatar = await this.avatarRepository.create({
      profile_id,
      avatar_src,
    });
    return avatar;
  }
  async updateAvatar(id: number, file: Express.Multer.File) {
    const avatar_src = await this.fileService.createFile(file);

    const avatar = await this.avatarRepository.update(
      { avatar_src },
      {
        where: { id },
        returning: true,
      },
    );
    return avatar;
  }

  async deleteAvatar(id: number, dto: DeleteAvatarDatabaseDto) {
    const avatar = await this.avatarRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return avatar;
  }
}
