import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUpdateDocumentDto } from './dto/create-update-document.dto';
import { DeleteDocumentDatabaseDto } from './dto/delete-document-database.dto';
import { Document } from './documents.model';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Document) private documentRepository: typeof Document,
  ) {}
  async createDocument(dto: CreateUpdateDocumentDto) {
    const document = await this.documentRepository.create(dto);
    return document;
  }

  async updateDocument(id: number, dto: CreateUpdateDocumentDto) {
    const document = await this.documentRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return document;
  }

  async deleteDocument(id: number, dto: DeleteDocumentDatabaseDto) {
    const document = await this.documentRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return document;
  }
}