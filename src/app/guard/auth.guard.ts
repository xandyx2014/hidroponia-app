import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, UrlSegment, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from '../service/login.service';
import { Storage } from '@ionic/storage';
import { StorageKey } from '../config/variable.config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private loginService: LoginService,
              private storage: Storage,
              private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise(async ( resolve, reject ) => {
      this.loginService.isLogin().subscribe( async ( resp ) => {
        if (resp === true) {
          resolve( true );
        } else {
          const itemStore = await this.storage.get( StorageKey );
          if (itemStore === undefined || itemStore === null) {
            await this.router.navigate(['/login']);
            resolve( false );
          } else {
            resolve(true);
          }
        }
      });
    });
  }
}
