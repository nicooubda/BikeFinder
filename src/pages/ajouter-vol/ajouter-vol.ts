import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {ListeVolPage} from "../liste-vol/liste-vol";

/**
 * Generated class for the AjouterVolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajouter-vol',
  templateUrl: 'ajouter-vol.html',
})
export class AjouterVolPage {
  resposeData : any;

  public userDetails : any;

  volData = {"dateJ":"","dateD":"","numPlaque":"","numChassis":"","nomP":"","numP":"","lieuVol":"","causeVol":"","autres":"","telephone":"","user_id":"","status":0};
  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider,private  toastCtrl: ToastController, private alertCtrl: AlertController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjouterVolPage');
  }
  newVol(){

    //Api connection
    this.volData.status = 0;
    this.volData.user_id = this.userDetails.user_id;
    if(this.volData.dateJ && this.volData.dateD && this.volData.numPlaque && this.volData.numChassis && this.volData.nomP && this.volData.numP && this.volData.lieuVol && this.volData.causeVol && this.volData.autres )
      this.authServiceProvider.postData(this.volData,"new-vol").then((result)=> {
        this.resposeData = result;
        if(this.resposeData.error){
          this.presentToast("Vol déja enregistré.")


        }
        else{
          console.log("Le vol enregistré");
          this.navCtrl.push(ListeVolPage);
          console.log(this.resposeData);
          this.presentAlert();

          localStorage.setItem('volData',JSON.stringify(this.resposeData))
        }

        }, (err) => {
        // Error log
      });
    else{
      this.presentToast("Informations invalides, remplissez tous les champs");
      //
    }
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    });
    toast.present();

  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Enregistrement',
      subTitle: 'Vol enregistré avec succès',
      buttons: ['Ok']
    });
    alert.present();
  }

}
