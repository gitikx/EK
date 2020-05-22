import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router, RouterModule} from '@angular/router';
import {first} from 'rxjs/operators';
import {Routes} from '../constants/routes';
import {ToasterService} from '../common/toaster.service';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  username: string;

  password: string;

  isSignIn: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private toasterService: ToasterService) {
  }

  ngOnInit(): void {
    this.isSignIn = true;
    this.authService.isAuthorized().pipe(first()).subscribe((value) => {
      if (value) {
        this.router.navigateByUrl(Routes.employees);
      }
    }, (error => {
      this.toasterService.showToast(error.message.slice(error.message.indexOf(':') + 1, error.message.length), 'error');
    }));
  }

  authorize(signFlag: boolean) {
    if (signFlag) {
      this.authService.signIn(this.username, this.password).then(value => {
        if (value) {
          this.router.navigateByUrl(Routes.employees);
        }
      }).catch(error => {
        this.toasterService.showToast(error.message.slice(error.message.indexOf(':') + 1, error.message.length), 'error');
      });
    } else {
      this.authService.register(this.username, this.password).then(value => {
        if (value) {
          this.router.navigateByUrl(Routes.employees);
        }
      }).catch(error => {
        this.toasterService.showToast(error.message.slice(error.message.indexOf(':') + 1, error.message.length), 'error');
      });
    }
  }

  forgotPassword() {
    if (this.username) {
      this.authService.forgotPassword(this.username).then(value => {
        this.toasterService.showToast('Reset link was sent to your email!');
      }).catch(error => {
        this.toasterService.showToast(error.message.slice(error.message.indexOf(':') + 1, error.message.length), 'error');
      });
    } else {
      this.toasterService.showToast('Put your email in the field "e-mail"',  'error');
    }
  }
}
