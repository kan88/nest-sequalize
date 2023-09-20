import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDocumentDto } from './dto/create-document.dto';
import { DeleteDocumentDatabaseDto } from './dto/delete-document-database.dto';
import { Document } from './documents.model';
import { UpdateVisibleDocumentsDto } from './dto/update-visible-documents.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { CreateDocumentDatabaseDto } from './dto/create-document-database.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Document) private documentRepository: typeof Document,
  ) {}
  async createDocument(dto: CreateDocumentDatabaseDto) {
    const document = await this.documentRepository.create(dto);
    return document;
  }

  async updateDocument(id: number, dto: UpdateDocumentDto) {
    const document = await this.documentRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return document;
  }

  async updateVisible(profile_id: number, dto: UpdateVisibleDocumentsDto) {
    const document = await this.documentRepository.update(dto, {
      where: {
        profile_id,
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
