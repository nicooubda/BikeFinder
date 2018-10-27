import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, ToastController} from 'ionic-angular';

import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {PostePage} from "../poste/poste";


/**
 * Generated class for the ListePostePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-poste',
  templateUrl: 'liste-poste.html',
})
export class ListePostePage {
  resposeData: any;
  postedeleteData = {"id":""};
  posteData : any;
  dataSet : any;
  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider, private alertCtrl: AlertController ,private  toastCtrl: ToastController) {
    this.getPoste();
  }
  converTime(time){
    let a = new Date(time*1000);
    return a;
  }


  onNewPoste(){
    this.navCtrl.push(PostePage);

  }
  getPoste(){
      this.authServiceProvider.postData(this.posteData,"liste-poste")
        .then((result)=> {
        this.resposeData = result;
        if(this.resposeData.listePosteData=="") {
          this.presentToast("La liste est vide.");}

          if(this.resposeData.listePosteData) {
          this.dataSet = this.resposeData.listePosteData;
          console.log( this.dataSet);
        }else{console.log("Erreur de chargement de la liste")}
      }, (err) => {
        // Error log
      });
  }

  deletePoste(id){
    //if(id){}
    this.postedeleteData.id = id;
    console.log(this.postedeleteData.id);
    this.authServiceProvider.postData(this.postedeleteData,"delete-poste").then((result)=> {
      this.resposeData = result;
      if(this.resposeData.success) {
        this.presentAlert();
        this.getPoste();
      }else{

        console.log("Erreur de chargement de la liste");
        // @ts-ignore
        this.presentAlert("Erreur de suppression");
      }
    }, (err) => {
      // Error log
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',


    });
    toast.present();

  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Suppresion',
      subTitle: 'Poste supprimé avec succès',
      buttons: ['Ok']
    });
    alert.present();
  }

}
