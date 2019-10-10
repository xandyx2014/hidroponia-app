import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { PagesUrl } from 'src/app/config/pageUrl.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pageUrl = PagesUrl;
  slideOpts = {
    loop: true,
    autoplay: true
  };
  constructor(private loginService: LoginService,
              private router: Router) {}
  ionViewWillEnter() {
    this.loginService.loginstorage();
  }
  irPagina(url) {
    this.router.navigate([url]);
  }

}
