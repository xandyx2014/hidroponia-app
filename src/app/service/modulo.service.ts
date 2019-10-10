import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_HOST } from '../config/variable.config';
import { RespuestaModuloFecha } from '../interface/modulo.interface';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  constructor(private http: HttpClient) { }

  moduloFecha(id: string, desde: string, hasta: string) {
    console.log( desde, hasta );
    const params = new HttpParams({
      fromObject: {
        desde,
        hasta
      }
    });
    return this.http.get<RespuestaModuloFecha>(`${URL_HOST}/hidroponia/modulo/${id}/datos`, {
      params
    });
  }
  moduloFechaPdf(id: string, desde: string, hasta: string) {
    window.open(`${URL_HOST}/hidroponia/modulo/${id}/datos/pdf?desde=${desde}&hasta=${hasta}`
    , '_blank');
  }
}
