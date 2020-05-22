import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {LoaderService} from '../common/loader.service';
import {ToasterService} from '../common/toaster.service';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {FirelistUtils} from '../utils/firelist.utils';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  columnMode = ColumnMode;
  reorderable: any = true;
  project: any = {};
  editing: any = {};
  employeesInProject: any = [];
  pm: any = {};
  random: any;
  allEmployee: any = [];
  inputedEmployee;
  projectId;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private angularFireDatabase: AngularFireDatabase,
              private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.projectId = params.id;
      this.angularFireDatabase.database.ref(`projects/${params.id}`).once('value', (value) => {
        this.project = value.val();
        this.project.isEnded = this.convertProjectEnded(this.project.isEnded);
        this.angularFireDatabase.database.ref(`/employee`).once('value', (value1) => {
          this.pm = value1.val()[this.project.pm];
          this.allEmployee = FirelistUtils.objectToArray(value1.val());
          this.pm.key = this.project.pm;
          this.employeesInProject = FirelistUtils.objectToArray(value1.val()).filter(empl => {
            return empl.projects && [this.project.key];
          });
        });
      });
    });

  }

  convertProjectEnded(stringBoolean: string): boolean {
      return stringBoolean === 'Yes';
  }

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.employeesInProject[rowIndex][cell] = event.target.value;
    this.employeesInProject = [...this.employeesInProject];
  }

  deleteEmployee(rowIndex) {
    this.employeesInProject.splice(rowIndex, 1);
  }

  selectEvent($event: any) {

  }

  onChangeSearch($event: any) {

  }

  onFocused($event: void) {
  }

  addEmployee() {
    this.employeesInProject.push(this.inputedEmployee);
    this.employeesInProject = [...this.employeesInProject]
  }

  save() {
    this.angularFireDatabase.database.ref(`projects/${this.projectId}`).set(this.project).then(value => {
      this.toasterService.showToast('Project was updated!', 'success');
    });
  }
}
