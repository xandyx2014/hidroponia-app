import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOpts = {
    loop: true,
    autoplay: true
  };
  constructor(private loginService: LoginService) {}
  ionViewWillEnter() {
    this.loginService.loginstorage();
  }

}
