import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APP_ID, URL_HOST_OPENW } from '../config/variable.config';
import { RespuestaPronostico } from '../interface/pronostico.interface';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PronosticoService {

  constructor(private http: HttpClient) { }

  consultarPronostico(lat, lon): Observable<RespuestaPronostico> {
    const params = new HttpParams({
      fromObject: {
        appid: APP_ID,
        units: 'metric',
        lat,
        lon,
      }
    });
    return this.http.get<RespuestaPronostico>(URL_HOST_OPENW, {params});
  }
}
