import { Injectable } from '@angular/core';
import { URL_HOST } from '../config/variable.config';
import { HttpClient } from '@angular/common/http';
import { RespHidroponiaModulo } from '../interface/hidroponiaModulo.interface';

@Injectable({
  providedIn: 'root'
})
export class HidroponiaService {
  constructor(private http: HttpClient) { }
  showHidroponia(id) {
    return this.http.get<RespHidroponiaModulo>(`${URL_HOST}/hidroponia/${id}/modulo`);
  }
}
