import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URL_HOST, StorageKey } from '../config/variable.config';
import { RespLogin, Usuario } from '../interface/login.interface';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private auth = new BehaviorSubject<boolean>(false);
  private usuario = new BehaviorSubject<Usuario>(null);
  constructor(private http: HttpClient,
              private loadingController: LoadingController,
              private notificationService: NotificationService,
              private storage: Storage,
              private router: Router) { }

  async login(username, password) {
    const loading = await this.loadingController.create({
      message: 'Cargando..'
    });
    await loading.present();
    this.http.post<RespLogin>(`${URL_HOST}/usuario/login`, {username, password})
      .subscribe( async (resp) => {
      if (resp !== null || resp !== undefined) {
        console.log( resp );
        if (resp.ok === true) {
          this.usuario.next(resp.data);
          this.auth.next(true);
          await loading.dismiss();
          await this.storage.set(StorageKey, {...resp.data, token: resp.token});
          await this.router.navigate(['/home']);
        } else {
          await loading.dismiss();
          this.notificationService.presentToast(resp.message);
        }
      }
    },
    () => {
      loading.dismiss();
    }
    );
  }
  async loginstorage() {
    const itemStore = await this.storage.get( StorageKey );
    if (itemStore !== undefined || itemStore !== null) {
      this.auth.next(true);
      this.usuario.next(itemStore);
    }
  }
  getUser() {
    return this.usuario.asObservable();
  }
  isLogin() {
    return this.auth.asObservable();
  }
  logout() {
     this.auth.next(false);
     this.storage.remove(StorageKey);
  }
}
