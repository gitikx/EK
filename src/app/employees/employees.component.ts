import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth-component/auth.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  rows = [
    {name: 'Austin', gender: 'Male', company: 'Swimlane'},
    {name: 'Dany', gender: 'Male', company: 'KFC'},
    {name: 'Molly', gender: 'Female', company: 'Burger King'},
    {name: 'Austin', gender: 'Male', company: 'Swimlane'},
    {name: 'Dany', gender: 'Male', company: 'KFC'},
    {name: 'Molly', gender: 'Female', company: 'Burger King'},
    {name: 'Austin', gender: 'Male', company: 'Swimlane'},
    {name: 'Dany', gender: 'Male', company: 'KFC'},
    {name: 'Molly', gender: 'Female', company: 'Burger King'},
    {name: 'Austin', gender: 'Male', company: 'Swimlane'},
    {name: 'Dany', gender: 'Male', company: 'KFC'},
    {name: 'Molly', gender: 'Female', company: 'Burger King'},
    {name: 'Dany', gender: 'Male', company: 'KFC'},
    {name: 'Molly', gender: 'Female', company: 'Burger King'},
    {name: 'Austin', gender: 'Male', company: 'Swimlane'},
    {name: 'Dany', gender: 'Male', company: 'KFC'},
    {name: 'Molly', gender: 'Female', company: 'Burger King'},
    {name: 'Austin', gender: 'Male', company: 'Swimlane'},
    {name: 'Dany', gender: 'Male', company: 'KFC'},
    {name: 'Molly', gender: 'Female', company: 'Burger King'},
    {name: 'Austin', gender: 'Male', company: 'Swimlane'},
    {name: 'Dany', gender: 'Male', company: 'KFC'},
    {name: 'Molly', gender: 'Female', company: 'Burger King'},
    {name: 'Dany', gender: 'Male', company: 'KFC'},
    {name: 'Molly', gender: 'Female', company: 'Burger King'},
    {name: 'Austin', gender: 'Male', company: 'Swimlane'},
    {name: 'Dany', gender: 'Male', company: 'KFC'},
    {name: 'Molly', gender: 'Female', company: 'Burger King'},
    {name: 'Austin', gender: 'Male', company: 'Swimlane'},
    {name: 'Dany', gender: 'Male', company: 'KFC'},
    {name: 'Molly', gender: 'Female', company: 'Burger King'},
    {name: 'Austin', gender: 'Male', company: 'Swimlane'},
    {name: 'Dany', gender: 'Male', company: 'KFC'},
    {name: 'Molly', gender: 'Female', company: 'Burger King'}
  ];
  columns = [{prop: 'name'}, {name: 'Gender'}, {name: 'Company'}];


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.checkAuthorizationAndRedirect();
  }

}
