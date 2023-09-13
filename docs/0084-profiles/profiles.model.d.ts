import { Model } from 'sequelize-typescript';
import { Document } from 'src/0084-documents/documents.model';
import { Education } from 'src/0084-education/education.model';
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
    documents: Document[];
    educations: Education[];
}
export {};
