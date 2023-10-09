import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Avatar } from './avatars.model';
import { DeleteAvatarDatabaseDto } from './dto/delete-avatar-database.dto';
import { FilesService } from 'src/9999-files/files.service';
import { E_SERVICES_CODE } from 'src/types/ENUMS';

@Injectable()
export class AvatarsService {
  constructor(
    @InjectModel(Avatar) private avatarRepository: typeof Avatar,
    private fileService: FilesService,
  ) {}
  async createAvatar(profile_id: number, file: Express.Multer.File) {
    const avatar_src = await this.fileService.createFile(
      E_SERVICES_CODE.profiles,
      file,
    );
    const avatar = await this.avatarRepository.create({
      profile_id,
      avatar_src,
    });
    return avatar;
  }

  async getAvatarsById(profile_id: number) {
    const avatar = await this.avatarRepository.findAll({
      where: {
        profile_id,
        status: true,
      },
    });
    return avatar;
  }
  async updateAvatar(id: number, file: Express.Multer.File) {
    const avatar_src = await this.fileService.createFile(
      E_SERVICES_CODE.profiles,
      file,
    );

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
