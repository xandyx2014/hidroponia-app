import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { AlertaService } from 'src/app/service/alerta.service';
import { Notificacion } from 'src/app/interface/notificacion.interface';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { NotificationService } from 'src/app/service/notification.service';
import { format } from 'date-fns';
import * as EmailValidator from 'email-validator';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {
  idModulo;
  valueSegment = 'temperatura';
  modulo: Notificacion[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private notificationService: NotificationService,
    private loadingController: LoadingController,
    private alertService: AlertaService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.obtenerDatos();
  }
  obtenerDatos(tipo = 'temperatura') {
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => {
        this.idModulo = id;
        return this.buscarModulo(this.idModulo, tipo);
      })
    ).subscribe((resp) => {
      this.modulo = resp.data;
    });
  }
  buscarModulo(id, tipo) {
    return this.alertService.mostrarNotificaciones(id, tipo);
  }
  async segmentChanged(event) {
    this.valueSegment = event.detail.value;
    const loading = await this.loadingController.create({
      message: 'Cargando..'
    });
    await loading.present();
    this.buscarModulo(this.idModulo, event.detail.value).pipe(take(1))
      .subscribe((resp) => {
        this.modulo = resp.data;
        loading.dismiss();
      });
  }
  async presentActionSheet(notificacion: Notificacion) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      mode: 'md',
      buttons: [{
        text: 'Borrar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.confirmarEliminar(notificacion);
        }
      }, {
        text: 'Ver',
        icon: 'book',
        handler: () => {
          this.notificationService.presentAlert({
            header: 'Alerta del modulo',
            subHeader: 'datos de la alerta',
            mode: 'md',
            message: `
            <table>
            <tr>
              <th>Nombre: </th>
              <td>${notificacion.nombre}</td>
            </tr>
            <tr>
              <th>Descripcion: </th>
              <td>${notificacion.descripcion}</td>
            </tr>
            <tr>
              <th>Tipo: </th>
              <td>${notificacion.tipo}</td>
            </tr>
            <tr>
              <th>Creado: </th>
              <td>${format(new Date(notificacion.createdAt), 'dd-MM-yyyy')}</td>
            </tr>
            </table>`,
            buttons: ['ok']
          });
        }
      }, {
        text: 'Enviar mail',
        icon: 'mail',
        handler: () => {
          this.notificationService.presentAlert({
            header: 'Enviar email!',
            mode: 'ios',
            inputs: [
              {
                name: 'email',
                type: 'text',
                placeholder: 'Escriba direccion email'
              }
            ],
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  console.log('Confirm Cancel');
                }
              }, {
                text: 'Ok',
                handler: ({ email }) => {
                  if (EmailValidator.validate(email)) {
                    this.alertService.enviarEmail(email, notificacion.descripcion)
                      .subscribe(() => {
                        this.notificationService.presentToast('Enviado correctamente');
                      });
                  } else {
                    this.notificationService.presentToast('El email no es valido');
                  }
                  console.log('Confirm Ok', email);
                }
              }
            ]
          });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async confirmarEliminar(notificacion: Notificacion) {
    await this.notificationService.presentAlert({
      header: 'Confirmar!',
      message: 'Desea Eliminar <strong>notificacion</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.alertService.borrarNotificacion(notificacion.id).subscribe(async (value: Notificacion) => {
              await this.notificationService.presentToast(`Borrado ${value.tipo}`);
              this.obtenerDatos(this.valueSegment);
            });
          }
        }
      ]
    });
  }
}
