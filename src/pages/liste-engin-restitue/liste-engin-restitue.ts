import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {RestitutionPage} from "../restitution/restitution";
import {AuthServiceProvider} from "../providers/auth-service/auth-service";

/**
 * Generated class for the ListeEnginRestituePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-engin-restitue',
  templateUrl: 'liste-engin-restitue.html',
})
export class ListeEnginRestituePage {
  restitutionData : any;
  resposeData : any;
  dataSet : any;
  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider ,private  toastCtrl: ToastController) {
    this.getRestitution();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeEnginRestituePage');
  }

  onNewRestitution(){
    this.navCtrl.push(RestitutionPage);
  }
  getRestitution(){
    this.authServiceProvider.postData(this.restitutionData,"liste-restitution").then((result)=> {
      this.resposeData = result;
      if(this.resposeData.listeRestitutionData=="") {
        this.presentToast("La liste est vide.");}
      if(this.resposeData.listeRestitutionData) {
        this.dataSet = this.resposeData.listeRestitutionData;
        console.log( this.dataSet);
      }else{console.log("Erreur de chargement de la liste")}
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
}
