import { ProfilesService } from './profiles.service';
import { Profile } from './profiles.model';
import { ProjectsService } from 'src/0084-projects/projects.service';
import { CreateProjectDto } from '../0084-projects/dto/create-project.dto';
import { Project } from 'src/0084-projects/projects.model';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { DocumentsService } from 'src/0084-documents/documents.service';
import { CreateUpdateDocumentDto } from 'src/0084-documents/dto/create-update-document.dto';
import { Document } from 'src/0084-documents/documents.model';
export declare class ProfilesController {
    private profilesService;
    private projectsService;
    private documentsService;
    constructor(profilesService: ProfilesService, projectsService: ProjectsService, documentsService: DocumentsService);
    getProfileOrCreateBySamaccountname(samaccountname: string): Promise<[Profile, boolean]>;
    updateProfileBySamaccountname(samaccountname: string, dto: UpdateProfileDto): Promise<[affectedCount: number, affectedRows: Profile[]]>;
    createProject(dto: CreateProjectDto): Promise<Project>;
    deleteProject(id: string): Promise<[affectedCount: number, affectedRows: Project[]]>;
    createDocument(dto: CreateUpdateDocumentDto): Promise<Document>;
    updateDocument(dto: CreateUpdateDocumentDto, id: string): Promise<[affectedCount: number, affectedRows: Document[]]>;
    deleteDocument(id: string): Promise<[affectedCount: number, affectedRows: Document[]]>;
}
