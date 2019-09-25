import { Component, OnInit } from '@angular/core';
import { HidroponiasService } from 'src/app/service/hidroponias.service';
import { LoginService } from 'src/app/service/login.service';
import { Hidroponia } from 'src/app/interface/hidroponia.interface';
import { flatMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  hidroponia: Hidroponia[] = [];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private hidroponiaService: HidroponiasService,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.loginService.loginstorage().then( (  ) => {
      this.loginService.getUser()
      .pipe(
        flatMap( resp => this.hidroponiaService.showHidroponias(resp.id) ))
      .subscribe( resp => {
        this.hidroponia = resp.data;
      });
    });
  }
  irPagina(item: Hidroponia) {
    this.router.navigate(['/hidroponia', item.id]);
  }
}
