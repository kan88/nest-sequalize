import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.model';
import { DeleteProjectDto } from './dto/delete-project.dto';
export declare class ProjectsService {
    private projectRepository;
    constructor(projectRepository: typeof Project);
    createProject(dto: CreateProjectDto): Promise<Project>;
    deleteProject(id: number, dto: DeleteProjectDto): Promise<[affectedCount: number]>;
}
