import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { AlertaService } from 'src/app/service/alerta.service';
import { Notificacion } from 'src/app/interface/notificacion.interface';
import { ActionSheetController } from '@ionic/angular';
import { NotificationService } from 'src/app/service/notification.service';
import { format } from 'date-fns';
import * as EmailValidator from 'email-validator';
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {
  idModulo;
  modulo: Notificacion[] = [];
  constructor(private activatedRoute: ActivatedRoute,
              private actionSheetController: ActionSheetController,
              private notificationService: NotificationService,
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
    // console.log( event );
    this.buscarModulo(this.idModulo, event.detail.value).pipe( take(1))
      .subscribe( ( resp ) => {
        this.modulo = resp.data;
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
          console.log('Delete clicked');
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
                handler: ({email}) => {
                  if ( EmailValidator.validate(email)) {
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
}
