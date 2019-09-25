import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_HOST } from '../config/variable.config';
import { RespHidroponia } from '../interface/hidroponia.interface';

@Injectable({
  providedIn: 'root'
})
export class HidroponiasService {

  constructor(private http: HttpClient) { }
  showHidroponias(id) {
    return this.http.get<RespHidroponia>(`${URL_HOST}/hidroponia/${id}`);
  }
}
