import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationService } from '../service/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {
  constructor(private notificacionService: NotificationService,
              private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const reqClone = req.clone();
    return next.handle(reqClone).pipe(
      catchError( ( err ) => {
        /* if (err instanceof HttpErrorResponse) {
          console.log( 'Si' );
        } */
        this.notificacionService.presentToast('Ha ocurrido un Error');
        this.router.navigate(['/home']);
        return throwError(err);
      })
    );
  }
}