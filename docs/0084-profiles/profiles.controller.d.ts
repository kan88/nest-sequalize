import { ProfilesService } from './profiles.service';
import { Profile } from './profiles.model';
import { ProjectsService } from 'src/0084-projects/projects.service';
import { CreateProjectDto } from '../0084-projects/dto/create-project.dto';
import { Project } from 'src/0084-projects/projects.model';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfilesController {
    private profilesService;
    private projectsService;
    constructor(profilesService: ProfilesService, projectsService: ProjectsService);
    getProfileOrCreateBySamaccountname(samaccountname: string): Promise<[Profile, boolean]>;
    updateProfileBySamaccountname(samaccountname: string, dto: UpdateProfileDto): Promise<[affectedCount: number]>;
    createProject(samaccountname: string, dto: CreateProjectDto): Promise<Project>;
    deleteProject(samaccountname: string, id: string): Promise<[affectedCount: number]>;
}
