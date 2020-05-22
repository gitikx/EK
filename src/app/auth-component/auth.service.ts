import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {first, switchMap} from 'rxjs/operators';
import {Routes} from '../constants/routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

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

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorized().pipe(first(), switchMap(value => {
      if (!value) {
        this.router.navigateByUrl(Routes.loginPage);
      }
      return of(!!value);
    }));
  }

  register(email: string, password: string): Promise<any> {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  forgotPassword(email: string): Promise<any> {
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }
}
