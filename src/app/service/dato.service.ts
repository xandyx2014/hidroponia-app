import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_HOST } from '../config/variable.config';
import { RespDato } from '../interface/dato.interface';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatoService {

  constructor(private http: HttpClient) { }
  showDato(id) {
    return  interval(2000).pipe(
      switchMap(() => this.http.get<RespDato>(`${URL_HOST}/dato/${id}`))
    );
  }
}
