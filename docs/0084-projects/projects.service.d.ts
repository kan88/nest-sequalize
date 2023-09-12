import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.model';
import { DeleteProjectDatabaseDto } from './dto/delete-project-database.dto';
export declare class ProjectsService {
    private projectRepository;
    constructor(projectRepository: typeof Project);
    createProject(dto: CreateProjectDto): Promise<Project>;
    deleteProject(id: number, dto: DeleteProjectDatabaseDto): Promise<[affectedCount: number, affectedRows: Project[]]>;
}
