import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastController: ToastController,
              private loadingController: LoadingController,
              private alertController: AlertController) {}

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      mode: 'md',
      duration: 2000
    });
    toast.present();
  }
  async presentLoading( callback: (parametro: HTMLIonLoadingElement) => void ) {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Espera un momento...',
      translucent: true,
    });
    await loading.present();
    callback(loading);
  }
  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);

    await alert.present();
  }
}
