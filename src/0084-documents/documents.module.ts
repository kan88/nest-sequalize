import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Document } from './documents.model';
import { DocumentsService } from './documents.service';

@Module({
  providers: [DocumentsService],
  imports: [SequelizeModule.forFeature([Document])],
  exports: [DocumentsService],
})
export class DocumentsModule {}
