import { E_STATUS } from 'src/types/ENUMS';

export class CreateVacancyDto {
  name_of_position: string;
  name_of_vacancy?: string | null;
  department: string;
  company: string;
  date_open: Date;
  date_close: Date;
  employees_quantity: number;
  sex_value?: string | null;
  age_min?: number | null;
  age_max?: number | null;
  salary_gross: string;
  salary_min: number;
  salary_max: number;
  salary_show?: boolean | null;
  experience?: string | null;
  employment_type: string;
  functional: string;
  wishes: string;
  advantages: string;
  offering: string;
  status: E_STATUS;
  contacts: string;
  education?: string | null;
  date: Date;
}
