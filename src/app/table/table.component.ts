import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {DataService} from '../common/data.service';
import {Page} from '../model/page.model';

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

  @Output()
  onDoubleClick = new EventEmitter();

  @Output()
  onPaging = new EventEmitter();

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

  event(event: any) {
    if (event.type === 'dblclick') {
      this.onDoubleClick.emit(event);
    }
  }

  paging($event: any) {
    this.onPaging.emit($event);
  }
}
