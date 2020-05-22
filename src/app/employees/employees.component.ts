import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth-component/auth.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {EmployeeModel} from '../model/employee.model';
import {LoaderService} from '../common/loader.service';
import {FirelistUtils} from '../utils/firelist.utils';
import {Routes} from '../constants/routes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  rows: any[];
  columns = [{name: 'Name'}, {name: 'Surname'}, {name: 'Gender'}, {name: 'Phone number', prop: 'phone'}, {
    name: 'Department',
    prop: 'department'
  }];

  constructor(private authService: AuthService,
              private angularFireDatabase: AngularFireDatabase,
              private loaderService: LoaderService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loaderService.processOperation(new Promise<any>(callback => {
      this.angularFireDatabase.database.ref('employee').on('value', value => {
        const promises = [];
        const array = FirelistUtils.objectToArray(value.val());
        for (const row of array) {
          promises.push(new Promise(resolve => {
            this.angularFireDatabase.database.ref(`department/${(row as EmployeeModel).department}`).on('value', (depName) => {
              (row as EmployeeModel).department = depName.val().name;
              resolve();
            });
          }));
        }
        Promise.all(promises).then(() => {
          this.rows = array;
          callback();
        });
      });
    })).then();

    //this.angularFireDatabase.database.ref('employee').set({})

    // this.angularFireDatabase.database.ref('employee').on('value', (value) => {
    //   console.log(value.val());
    // });

    // this.angularFireDatabase.database.ref().update({employee: 3}, () => {
    //   console.log('ok');
    // });
    // this.angularFireDatabase.database.ref('employee').remove();

    // this.angularFireDatabase.list('employee').valueChanges().subscribe(value => {
    //   this.angularFireDatabase.list('employee').remove(value)
    // });
  }

  selectEmployee(event) {
    this.router.navigateByUrl(`${Routes.employees}/${event.row.key}`);
  }

  pageEmit(event: any) {
    console.log(event);
  }
}
