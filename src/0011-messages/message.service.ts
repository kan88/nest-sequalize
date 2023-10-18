import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IMessage, Message } from './message.model';
import { CreateMessageDto } from './dto/create-message.dto';
import { FilesService } from 'src/nnnn-files/files.service';
import { CreateUploadDto } from './dto/create-upload.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message)
    private messageRepository: typeof Message,
    private filesService: FilesService,
  ) {}
  async create(dto: IMessage) {
    const data = await this.messageRepository.create(dto);
    return data;
  }

  async upload(
    dto: CreateUploadDto,
    file: Express.Multer.File,
    chats_id: number,
  ) {
    const link = await this.filesService.createFile('0011', file);
    const data = await this.messageRepository.create({
      ...dto,
      link,
      chats_id,
    });
    return data;
  }
  async remove(id: number) {
    const data = await this.messageRepository.update(
      { status: false },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
    return data;
  }

  async getByChatsId(chats_id: number) {
    const data = await this.messageRepository.findAll({
      where: {
        chats_id,
      },
    });
    return data;
  }
}
