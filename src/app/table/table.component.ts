import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {DataService} from '../common/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, DoCheck {

  @Input()
  rows: any;

  @Input()
  columns: any;

  loadingIndicator = true;

  reorderable = true;

  columnMode = ColumnMode;

  console = console;

  limit: number;

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    this.limit = (Number(this.dataService.innerHeight) - 40 - 90 - 100) / 37;
  }
}
