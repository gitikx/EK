import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router, RouterModule} from '@angular/router';
import {first} from 'rxjs/operators';
import {Routes} from '../constants/routes';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  username: string;

  password: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isAuthorized().pipe(first()).subscribe(value => {
      if (value) {
        this.router.navigateByUrl(Routes.homePage);
      }
    });
  }

  authorize() {
    console.log('dsa')
    this.authService.signIn(this.username, this.password).then(value => {
      console.log(value)
      if (value) {
        this.router.navigateByUrl(Routes.homePage);
      } else {
        alert('Error');
      }
    }).catch(error => {
      console.log(error)
    });
  }
}
