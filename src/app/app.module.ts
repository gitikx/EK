import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {AuthComponent} from './auth-component/auth.component';
import {AuthService} from './auth-component/auth.service';
import {AngularFireModule} from '@angular/fire';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataService} from './common/data.service';
import {MenuBarComponent} from './menu-bar/menu-bar.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { EmployeesComponent } from './employees/employees.component';
import { TableComponent } from './table/table.component';
import { DepartmentsComponent } from './departments/departments.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { EmployeeComponent } from './employee/employee.component';
import {Routes} from './constants/routes';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    MenuBarComponent,
    EmployeesComponent,
    TableComponent,
    DepartmentsComponent,
    AnalyticsComponent,
    EmployeeComponent
  ],
  imports: [
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyB9Ib213oPkGkOIhKpuh4AHKEzvAqyKito',
      authDomain: 'mykeeper-4989d.firebaseapp.com',
      databaseURL: 'https://mykeeper-4989d.firebaseio.com',
      projectId: 'mykeeper-4989d',
      storageBucket: 'mykeeper-4989d.appspot.com',
      messagingSenderId: '195695195364',
      appId: '1:195695195364:web:b801eee32a135b94d428f1',
      measurementId: 'G-3XQR27QHN3'
    }),
    BrowserModule,
    RouterModule.forRoot([
      {path: Routes.homePage, component: HomeComponent},
      {path: Routes.loginPage, component: AuthComponent},
      {path: Routes.employees, component: EmployeesComponent},
      {path: 'table', component: TableComponent},
      {path: Routes.departments, component: DepartmentsComponent}
    ]),
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule
  ],
  providers: [
    AuthService,
    DataService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}


