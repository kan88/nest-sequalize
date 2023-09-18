import { ProfilesService } from './profiles.service';
import { Profile } from './profiles.model';
import { ProjectsService } from 'src/0084-projects/projects.service';
import { CreateProjectDto } from '../0084-projects/dto/create-project.dto';
import { Project } from 'src/0084-projects/projects.model';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { DocumentsService } from 'src/0084-documents/documents.service';
import { CreateDocumentDto } from 'src/0084-documents/dto/create-document.dto';
import { Document } from 'src/0084-documents/documents.model';
import { UpdateVisibleDocumentsDto } from 'src/0084-documents/dto/update-visible-documents.dto';
import { Education } from 'src/0084-education/education.model';
import { CreateEducationDto } from 'src/0084-education/dto/create-education.dto';
import { EducationService } from 'src/0084-education/education.service';
import { UpdateVisibleEducationsDto } from 'src/0084-education/dto/update-visible-educations.dto';
import { WorksService } from 'src/0084-works/works.service';
import { Work } from 'src/0084-works/works.model';
import { CreateWorkDto } from 'src/0084-works/dto/create-work.dto';
import { UpdateVisibleWorksDto } from 'src/0084-works/dto/update-visible-works.dto';
import { UpdateDocumentDto } from 'src/0084-documents/dto/update-document.dto';
import { UpdateEducationDto } from 'src/0084-education/dto/update-education.dto';
import { UpdateWorkDto } from 'src/0084-works/dto/update-work.dto';
import { AchievementsService } from 'src/0084-achievements/achievements.service';
import { CreateAchievementDto } from 'src/0084-achievements/dto/create-achievement.dto';
import { UpdateVisibleAchievementsDto } from 'src/0084-achievements/dto/update-visible-achievements.dto';
import { UpdateAchievementDto } from 'src/0084-achievements/dto/update-achievement.dto';
import { Achievement } from 'src/0084-achievements/achievements.model';
export declare class ProfilesController {
    private profilesService;
    private projectsService;
    private documentsService;
    private educationService;
    private worksService;
    private achievementService;
    constructor(profilesService: ProfilesService, projectsService: ProjectsService, documentsService: DocumentsService, educationService: EducationService, worksService: WorksService, achievementService: AchievementsService);
    getProfileOrCreateBySamaccountname(samaccountname: string): Promise<[Profile, boolean]>;
    updateProfileBySamaccountname(samaccountname: string, dto: UpdateProfileDto): Promise<[affectedCount: number, affectedRows: Profile[]]>;
    createProject(dto: CreateProjectDto): Promise<Project>;
    deleteProject(id: number): Promise<[affectedCount: number, affectedRows: Project[]]>;
    createDocument(dto: CreateDocumentDto): Promise<Document>;
    updateVisibleDocuments(dto: UpdateVisibleDocumentsDto): Promise<[affectedCount: number, affectedRows: Document[]]>;
    updateDocument(dto: UpdateDocumentDto, id: number): Promise<[affectedCount: number, affectedRows: Document[]]>;
    deleteDocument(id: number): Promise<[affectedCount: number, affectedRows: Document[]]>;
    createEducation(dto: CreateEducationDto): Promise<Education>;
    updateVisibleEducations(dto: UpdateVisibleEducationsDto): Promise<[affectedCount: number, affectedRows: Education[]]>;
    updateEducation(dto: UpdateEducationDto, id: number): Promise<[affectedCount: number, affectedRows: Education[]]>;
    deleteEducation(id: number): Promise<[affectedCount: number, affectedRows: Education[]]>;
    createWork(dto: CreateWorkDto): Promise<Work>;
    updateVisibleWorks(dto: UpdateVisibleWorksDto): Promise<[affectedCount: number, affectedRows: Work[]]>;
    updateWorks(dto: UpdateWorkDto, id: number): Promise<[affectedCount: number, affectedRows: Work[]]>;
    deleteWork(id: number): Promise<[affectedCount: number, affectedRows: Work[]]>;
    createAchievement(dto: CreateAchievementDto): Promise<Achievement>;
    updateVisibleAchievemens(dto: UpdateVisibleAchievementsDto): Promise<[affectedCount: number, affectedRows: Achievement[]]>;
    updateAchievement(dto: UpdateAchievementDto, id: number): Promise<[affectedCount: number, affectedRows: Achievement[]]>;
    deleteAchievement(id: number): Promise<[affectedCount: number, affectedRows: Achievement[]]>;
}
