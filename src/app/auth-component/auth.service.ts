import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {Routes} from '../constants/routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router) {
  }

  isAuthorized(): Observable<any> {
    return this.angularFireAuth.authState;
  }

  signIn(email: string, password: string): Promise<any>{
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<any> {
    return this.angularFireAuth.signOut();
  }

  checkAuthorizationAndRedirect(): void {
    this.isAuthorized().pipe(first()).subscribe(value => {
      if (!value) {
        this.router.navigateByUrl(Routes.loginPage);
      }
    });
  }
}
