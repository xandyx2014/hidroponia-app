import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username = '';
  password = '';
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.loginService.logout();
  }
  loguearse() {
    this.loginService.login(this.username, this.password);
    // this.router.navigate(['/home']);
  }
}
