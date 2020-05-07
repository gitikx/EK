import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth-component/auth.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.checkAuthorizationAndRedirect();
  }
}
