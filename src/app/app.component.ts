import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth-component/auth.service';
import {DataService} from './common/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'EK';

  constructor(public authService: AuthService,
              private dataService: DataService) {
    dataService.innerHeight = window.innerHeight;
    window.onresize = () => {
      dataService.innerHeight = window.innerHeight;
    }
  }

  ngOnInit(): void {

  }
}
