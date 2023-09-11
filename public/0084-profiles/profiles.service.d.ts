import { Profile } from './profiles.model';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfilesService {
    private profileRepository;
    constructor(profileRepository: typeof Profile);
    updateProfileBySamaccountname(dto: UpdateProfileDto, samaccountname: string): Promise<[affectedCount: number]>;
    getProfileOrCreateBySamaccountname(samaccountname: string): Promise<[Profile, boolean]>;
}
