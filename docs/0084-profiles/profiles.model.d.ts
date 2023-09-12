import { Model } from 'sequelize-typescript';
import { Project } from 'src/0084-projects/projects.model';
interface TYPE_PROFILE_CREATE {
    samaccountname: string;
}
export declare class Profile extends Model<Profile, TYPE_PROFILE_CREATE> {
    id: number;
    samaccountname: string;
    email: string;
    mobile: string;
    birthday: Date;
    birthplace: string;
    visible: boolean;
    visible_year: boolean;
    projects: Project[];
}
export {};
