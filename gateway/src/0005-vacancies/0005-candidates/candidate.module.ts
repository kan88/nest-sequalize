import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/0000-roles/administrator.model';
import { RolesModule } from 'src/0000-roles/administrator.module';
import { FilesModule } from 'src/9999-files/files.module';
import { Candidate } from './candidate.model';
import { CandidateService } from './candidate.service';

@Module({
  providers: [CandidateService],
  controllers: [],
  imports: [
    SequelizeModule.forFeature([Candidate, Role]),
    FilesModule,
    RolesModule,
  ],
  exports: [CandidateService],
})
export class CandidateModule {}
