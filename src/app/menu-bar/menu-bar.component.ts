import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth-component/auth.service';
import {Router} from '@angular/router';
import {StringUtils} from '../utils/string.utils';
import {Routes} from '../constants/routes';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  currentRoute: any;

  compareStrings = StringUtils.compareWithoutCase;

  constructor(public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url.replace('/', '').split('').map((element, index) => index === 0 ? element.toUpperCase() : element).join('');
  }

  changeUrl(url: string) {
    this.currentRoute = url;
  }

  logout() {
    this.authService.signOut().then(() => {
      this.router.navigateByUrl(Routes.loginPage);
    });
  }
}
