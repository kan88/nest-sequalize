import { Model } from 'sequelize-typescript';
import { Profile } from 'src/0084-profiles/profiles.model';
interface TYPE_PROJECT_CREATE {
    profile_id: number;
    profile_name: string;
}
export declare class Project extends Model<Project, TYPE_PROJECT_CREATE> {
    id: number;
    profile: Profile;
    profile_id: number;
    project_name: string;
    status: boolean;
}
export {};
