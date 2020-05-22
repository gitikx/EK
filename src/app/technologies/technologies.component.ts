import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../auth-component/auth.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {LoaderService} from '../common/loader.service';
import {Router} from '@angular/router';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {FirelistUtils} from '../utils/firelist.utils';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {
  @ViewChild('myTable') table: any;

  funder = [];
  calculated = [];
  pending = [];
  groups = [];

  editing = {};
  columnMode = ColumnMode;

  rows: any[] = [
    {
      "exppayyes": 1,
      "exppayno": 0,
      "exppaypending": 0,
      "source": "Funder",
      "name": "Ethel Price",
      "gender": "female",
      "company": "Johnson, Johnson and Partners, LLC CMP DDC",
      "age": 22,
      "comment": "test1",
      "groupcomment": "group comment test  with multiple lines of text. group comment test  with multiple lines of text."
    },
    {
      "exppayyes": 0,
      "exppayno": 1,
      "exppaypending": 0,
      "source": "Calculated",
      "name": "Wilder Gonzales",
      "gender": "male",
      "company": "Geekko",
      "age": 22,
      "comment": "test2",
      "groupcomment": "group comment test  with multiple lines of text. group comment test  with multiple lines of text."
    },
    {
      "exppayyes": 0,
      "exppayno": 0,
      "exppaypending": 1,
      "source": "Manual",
      "name": "Georgina Schultz",
      "gender": "female",
      "company": "Suretech",
      "age": 22,
      "comment": "test3",
      "groupcomment": "group comment test  with multiple lines of text. group comment test  with multiple lines of text."
    },
    {
      "exppayyes": 0,
      "exppayno": 0,
      "exppaypending": 0,
      "source": "Manual",
      "name": "Carroll Buchanan",
      "gender": "male",
      "company": "Ecosys",
      "age": 22,
      "comment": "test4",
      "groupcomment": "group comment test  with multiple lines of text. group comment test  with multiple lines of text."
    },
    {
      "exppayyes": 0,
      "exppayno": 0,
      "exppaypending": 0,
      "source": "Manual",
      "name": "Carroll Buchanan",
      "gender": "male",
      "company": "Ecosys",
      "age": 23,
      "comment": "test4",
      "groupcomment": "group comment test  with multiple lines of text. group comment test  with multiple lines of text."
    },
  ];
  reorderable: any = true;
  technologies: any = [];

  constructor(private authService: AuthService,
              private angularFireDatabase: AngularFireDatabase,
              private loaderService: LoaderService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.angularFireDatabase.database.ref('technologies').once('value', (value) => {
      this.technologies = FirelistUtils.objectToArray(value.val());

      for (const tech of this.technologies) {
          this.angularFireDatabase.database.ref(`techGroup/${tech.groupKey}`).once('value', (value1) => {
            tech.groupName = value1.val().name;
          });
      }
    })
  }

  selectEmployee($event: any) {

  }

  pageEmit($event: any) {

  }

  event(event: any) {
    if (event.type === 'dblclick') {
      console.log('dblclick');
    }
  }

  checkGroup(event, row, rowIndex, group) {
    let groupStatus = 'Pending';
    let expectedPaymentDealtWith = true;

    row.exppayyes = 0;
    row.exppayno = 0;
    row.exppaypending = 0;

    if (event.target.checked) {
      if (event.target.value === '0') {
        // expected payment yes selected
        row.exppayyes = 1;
      } else if (event.target.value === '1') {
        // expected payment yes selected
        row.exppayno = 1;
      } else if (event.target.value === '2') {
        // expected payment yes selected
        row.exppaypending = 1;
      }
    }

    if (group.length === 2) {
      // There are only 2 lines in a group
      // tslint:disable-next-line:max-line-length
      if (
        ['Calculated', 'Funder'].indexOf(group[0].source) > -1 &&
        ['Calculated', 'Funder'].indexOf(group[1].source) > -1
      ) {
        // Sources are funder and calculated
        // tslint:disable-next-line:max-line-length
        if (group[0].startdate === group[1].startdate && group[0].enddate === group[1].enddate) {
          // Start dates and end dates match
          for (let index = 0; index < group.length; index++) {
            if (group[index].source !== row.source) {
              if (event.target.value === '0') {
                // expected payment yes selected
                group[index].exppayyes = 0;
                group[index].exppaypending = 0;
                group[index].exppayno = 1;
              }
            }

            if (group[index].exppayyes === 0 && group[index].exppayno === 0 && group[index].exppaypending === 0) {
              expectedPaymentDealtWith = false;
            }
            console.log('expectedPaymentDealtWith', expectedPaymentDealtWith);
          }
        }
      }
    } else {
      for (let index = 0; index < group.length; index++) {
        if (group[index].exppayyes === 0 && group[index].exppayno === 0 && group[index].exppaypending === 0) {
          expectedPaymentDealtWith = false;
        }
        console.log('expectedPaymentDealtWith', expectedPaymentDealtWith);
      }
    }

    // check if there is a pending selected payment or a row that does not have any expected payment selected
    if (
      group.filter(rowFilter => rowFilter.exppaypending === 1).length === 0 &&
      group.filter(rowFilter => rowFilter.exppaypending === 0 && rowFilter.exppayyes === 0 && rowFilter.exppayno === 0)
        .length === 0
    ) {
      console.log('expected payment dealt with');

      // check if can set the group status
      const numberOfExpPayYes = group.filter(rowFilter => rowFilter.exppayyes === 1).length;
      const numberOfSourceFunder = group.filter(rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Funder')
        .length;
      const numberOfSourceCalculated = group.filter(
        rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Calculated'
      ).length;
      const numberOfSourceManual = group.filter(rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Manual')
        .length;

      console.log('numberOfExpPayYes', numberOfExpPayYes);
      console.log('numberOfSourceFunder', numberOfSourceFunder);
      console.log('numberOfSourceCalculated', numberOfSourceCalculated);
      console.log('numberOfSourceManual', numberOfSourceManual);

      if (numberOfExpPayYes > 0) {
        if (numberOfExpPayYes === numberOfSourceFunder) {
          groupStatus = 'Funder Selected';
        } else if (numberOfExpPayYes === numberOfSourceCalculated) {
          groupStatus = 'Calculated Selected';
        } else if (numberOfExpPayYes === numberOfSourceManual) {
          groupStatus = 'Manual Selected';
        } else {
          groupStatus = 'Hybrid Selected';
        }
      }
    }

    group[0].groupstatus = groupStatus;
  }

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  toggleExpandGroup(group) {
    console.log('Toggled Expand Group!', group);
    this.table.groupHeader.toggleExpandGroup(group);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
}
