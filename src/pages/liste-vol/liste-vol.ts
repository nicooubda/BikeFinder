import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {AjouterVolPage} from "../ajouter-vol/ajouter-vol";
// @ts-ignore
import {count, count} from "rxjs/operators";

/**
 * Generated class for the ListeVolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-vol',
  templateUrl: 'liste-vol.html',
})
export class ListeVolPage {
  resposeData: any;
  volData: any;
  dataSet: any;
  voldeleteData = {"id":""};
  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider, private alertCtrl: AlertController ,private  toastCtrl: ToastController ) {
    this.getVol();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeVolPage');
  }

  onNewVol(){
    this.navCtrl.push(AjouterVolPage);
  }
  getVol(){
    this.authServiceProvider.postData(this.volData,"liste-vol").then((result)=> {
      this.resposeData = result;
      if(this.resposeData.listeVolData==""){
        this.presentToast("La liste est vide.");}
      if(this.resposeData.listeVolData) {
        this.dataSet = this.resposeData.listeVolData;
        // @ts-ignore
        console.log(count(this.dataSet));
      }else{console.log("Erreur de chargement de la liste")}
    }, (err) => {
      // Error log
    });
  }

  deletePoste(id){
    //if(id){}
    this.voldeleteData.id = id;
    console.log(this.voldeleteData.id);
    this.authServiceProvider.postData(this.voldeleteData,"delete-vol").then((result)=> {
      this.resposeData = result;
      if(this.resposeData.listePosteData=="") {
        this.presentToast("La liste est vide.");}
      if(this.resposeData.success) {

        this.presentAlert();
        this.getVol();
      }else{

        console.log("Erreur de chargement de la liste");
        // @ts-ignore
        this.presentAlert("Erreur de suppression");
      }
    }, (err) => {
      // Error log
    });
  }


  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Suppresion',
      subTitle: 'Vol supprimé avec succès',
      buttons: ['Ok']
    });
    alert.present();
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',


    });
    toast.present();

  }
}
