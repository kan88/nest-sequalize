import { Injectable } from '@nestjs/common';
import { UserService } from 'src/9999-users/user.service';

@Injectable()
export class PhoneService {
  constructor(private userService: UserService) {}
  async find(
    search: string | null,
    department: string | null,
    sono: string | null,
    company: string | null,
    limit: number,
    offset: number,
  ) {
    const data = await this.userService.find(
      search,
      department,
      sono,
      company,
      limit,
      offset,
    );
    return data;
  }
}
