import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_HOST } from '../config/variable.config';
import { RespNotificacion } from '../interface/notificacion.interface';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(private Http: HttpClient) { }

  mostrarNotificaciones(id, query) {
    const params = new HttpParams({
      fromObject: {
        por: query
      }
    });
    return this.Http.get<RespNotificacion>(`${URL_HOST}/notificacion/${id}`, { params });
  }
  enviarEmail(email, descripcion) {
    return this.Http.post(`${URL_HOST}/notificacion`, { email, descripcion})
    .pipe(
      take(1)
    );
  }
}
