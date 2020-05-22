import {GendersEnum} from '../constants/genders.enum';
import {MartialEnum} from '../constants/martial.enum';

export class EmployeeModel {
  birthday: any;
  name: string;
  department: string;
  phone: number;
  surname: string;
  gender: GendersEnum;
  education: any;
  languages: object;
  martial: MartialEnum;
  position: string;
  projects: any;
  salary: number;
  technologies: object;
}
