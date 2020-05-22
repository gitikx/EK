import {Component, OnInit} from '@angular/core';
import {FirelistUtils} from '../utils/firelist.utils';
import {AuthService} from '../auth-component/auth.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {LoaderService} from '../common/loader.service';
import {Router} from '@angular/router';
import {Routes} from '../constants/routes';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  rows: any[] = [];
  columns = [
    {
      name: 'Project name',
      prop: 'name'
    },
    {
      name: 'Start date',
      prop: 'startDate'
    },
    {
      name: 'Project manager',
      prop: 'pmName'
    },
    {
      name: 'Is ended',
      prop: 'isEnded'
    }];


  constructor(private authService: AuthService,
              private angularFireDatabase: AngularFireDatabase,
              private loaderService: LoaderService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loaderService.processOperation(new Promise<any>(callback => {
      this.angularFireDatabase.database.ref('projects').on('value', value => {
        const promises = [];
        const array = FirelistUtils.objectToArray(value.val());
        for (const row of array) {
          promises.push(new Promise(resolve => {
            this.angularFireDatabase.database.ref(`employee/${row.pm}`).on('value', (depName) => {
              row.pmName = depName.val().name + ' ' + depName.val().surname;
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
  }

  selectProject(event: any) {
    this.router.navigateByUrl(`${Routes.projects}/${event.row.key}`);
  }

  pageEmit($event: any) {
  }
}
