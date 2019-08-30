import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController, ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

 
  loader: any=null;
  alert: any;
  notLength: number;
  constructor(private alertCtrl: AlertController,
    public loadingController: LoadingController,
    private toastCtrl: ToastController,
    private actionSheetController: ActionSheetController) { }

  async presentActionSheet(title, option1, option2, f1, f2) {
    const actionSheet = await this.actionSheetController.create({
      header: title,
      buttons: [{
        text: option1,
        // icon: 'trash',
        handler: f1
      }, {
        text: option2,
        //icon: 'share',
        handler: f2
      }]
    });
    await actionSheet.present();
  }
  async presentLoading(msg) {
    this.loader = await this.loadingController.create({
      message: msg,
      spinner: "crescent"
    });
    await this.loader.present();
  }
  async dismissLoad() {
    await this.loader.dismiss();
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
