import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {LoaderService} from '../common/loader.service';
import {ToasterService} from '../common/toaster.service';
import {Routes} from '../constants/routes';
import {EmployeeModel} from '../model/employee.model';
import {FirelistUtils} from '../utils/firelist.utils';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee: EmployeeModel = new EmployeeModel();

  positions: any = [];

  departments: any = [];

  searchText: string;

  educations: any = [];

  keys = Object.keys;

  reorderable: any = true;

  columnMode: any = ColumnMode;

  languages: any = [];

  employeeLanguages = [];

  employeeTechnologies = [];

  inputedLanguage;


  editingLanguage: any = {};
  technologies: any;
  projects: any;
  projectsColumns: any;
  employeeProjects: any[];
  inputedTechnology: any;
  editingTechnology: any = {};
  employeeKey: number;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private angularFireDatabase: AngularFireDatabase,
              private loaderService: LoaderService,
              private toasterService: ToasterService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.loaderService.processOperation(this.angularFireDatabase.database.ref(`employee/${params.id}`).once('value')).then((value) => {
        this.employeeKey = params.id;
        if (value.val()) {
          this.employee = value.val();
          this.angularFireDatabase.database.ref(`position`).once('value').then((value1 => {
            this.positions = FirelistUtils.objectToArray(value1.val());
          }));
          this.angularFireDatabase.database.ref(`department`).once('value').then((value1 => {
            this.departments = FirelistUtils.objectToArray(value1.val());
          }));
          this.angularFireDatabase.database.ref(`education`).once('value').then((value1 => {
            this.educations = FirelistUtils.objectToArray(value1.val());
          }));
          this.angularFireDatabase.database.ref(`languages`).once('value').then((value1 => {
            this.languages = FirelistUtils.objectToArray(value1.val());
            this.employeeLanguages = FirelistUtils.objectToArray(this.employee.languages);
            for (const lang of this.employeeLanguages) {
              lang.name = FirelistUtils.getNameFromArrayByKey(this.languages, lang.key);
            }
          }));
          this.angularFireDatabase.database.ref('technologies').once('value').then((value1 => {
            this.technologies = FirelistUtils.objectToArray(value1.val());
            this.employeeTechnologies = FirelistUtils.objectToArray(this.employee.technologies);
            console.log(this.employeeTechnologies)
            for (const tech of this.employeeTechnologies) {
              tech.name = FirelistUtils.getNameFromArrayByKey(this.technologies, tech.key);
            }
          }));
          this.angularFireDatabase.database.ref('projects').once('value').then((projects) => {
            this.projects =  FirelistUtils.objectToArray(projects.val());
            this.employeeProjects = FirelistUtils.objectToArray(this.employee.projects);

            for (const prj of this.employeeProjects) {
                prj.name = FirelistUtils.getNameFromArrayByKey(this.projects, prj.key);
                this.projectsColumns = [{prop: 'name', name: 'Project name'}, {prop: 'startDate', name: 'Start date'}];
            }
          });
        } else {
          this.toasterService.showToast('Loading failed', 'error');
          this.router.navigateByUrl(Routes.employees);
        }
      });
    });
  }

  event($event: any) {

  }

  updateLanguage(event, cell, rowIndex) {
    this.editingLanguage[rowIndex + '-' + cell] = false;
    this.employeeLanguages[rowIndex][cell] = event.target.value;
    this.employeeLanguages = [...this.employeeLanguages];
  }

  deleteLanguage(rowIndex) {
    this.employeeLanguages.splice(rowIndex, 1);
  }

  addLanguage() {
    this.employeeLanguages.push({
      ...this.inputedLanguage,
      level: 'Intermediate'
    });
    this.employeeLanguages = [...this.employeeLanguages];
  }

  addTechnology() {
    this.employeeTechnologies.push({
      ...this.inputedTechnology,
      level: 'Intermediate'
    });
    this.employeeTechnologies = [...this.employeeTechnologies];
  }

  selectEvent($event: any) {

  }

  onChangeSearch($event: any) {

  }

  onFocused($event: void) {

  }

  deleteTechnology(rowIndex) {
    this.employeeTechnologies.splice(rowIndex, 1);
  }

  save() {
    this.employee.languages = {};
    for (const lang of this.employeeLanguages) {
      this.employee.languages[lang.key] = {
        level: lang.level
      };
    }
    this.employee.technologies = {};
    for (const tech of this.employeeTechnologies) {
      this.employee.technologies[tech.key] = {
        level: tech.level
      };
    }
    this.angularFireDatabase.database.ref(`employee/${this.employeeKey}`).set(this.employee).then(value => {
      this.toasterService.showToast('Employee was updated!', 'success');
    });
  }

  updateTechnology(event, cell, rowIndex) {
    this.editingTechnology[rowIndex + '-' + cell] = false;
    this.employeeTechnologies[rowIndex][cell] = event.target.value;
    this.employeeTechnologies = [...this.employeeTechnologies];
  }
}
