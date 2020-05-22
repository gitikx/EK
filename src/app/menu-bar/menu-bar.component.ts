import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth-component/auth.service';
import {Router} from '@angular/router';
import {StringUtils} from '../utils/string.utils';
import {Routes} from '../constants/routes';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ToasterService} from '../common/toaster.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  currentRoute: any;

  compareStrings = StringUtils.compareWithoutCase;

  constructor(public authService: AuthService,
              private router: Router,
              private toasterService: ToasterService) {
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url.replace('/', '').split('').map((element, index) => index === 0 ? element.toUpperCase() : element).join('');
  }

  changeUrl(url: string) {
    this.currentRoute = url;
  }

  logout() {
    this.authService.signOut().then(() => {
      this.toasterService.showToast('Log out success!');
      this.router.navigateByUrl(Routes.loginPage);
    });
  }
}
