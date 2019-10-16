import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { AlertaService } from 'src/app/service/alerta.service';
import { Notification } from 'rxjs';
import { Notificacion } from 'src/app/interface/notificacion.interface';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {
  idModulo;
  modulo: Notificacion[] = [];
  constructor(private activatedRoute: ActivatedRoute,
              private alertService: AlertaService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.activatedRoute.params.pipe(
      switchMap( ( { id } ) => {
        this.idModulo = id;
        return this.buscarModulo(this.idModulo, 'temperatura');
      })
    ).subscribe( ( resp ) => {
      this.modulo = resp.data;
    });
  }
  buscarModulo(id, tipo) {
    return this.alertService.mostrarNotificaciones(id, tipo);
  }
  segmentChanged(event) {
    console.log( event );
    this.buscarModulo(this.idModulo, event.detail.value).pipe( take(1))
      .subscribe( ( resp ) => {
        console.log( resp );
        this.modulo = resp.data;
      });
  }
}
