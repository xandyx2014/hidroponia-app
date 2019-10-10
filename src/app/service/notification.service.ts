import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastController: ToastController,
              private loadingController: LoadingController) {}

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
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
}
