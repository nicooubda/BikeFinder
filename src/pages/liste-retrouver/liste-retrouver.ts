import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {AjouterTrouverPage} from "../ajouter-trouver/ajouter-trouver";

/**
 * Generated class for the ListeRetrouverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-retrouver',
  templateUrl: 'liste-retrouver.html',
})
export class ListeRetrouverPage {
  retouverData:any;
  posteData : any;
  dataSet: any;
  resposeData: any;
  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider ,private  toastCtrl: ToastController) {
    this.getRetrouver();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeRetrouverPage');
  }
  onNewPoste(){
    this.navCtrl.push(AjouterTrouverPage);
  }
  getRetrouver(){
    this.authServiceProvider.postData(this.retouverData,"liste-retrouver").then((result)=> {
      this.resposeData = result;
      if(this.resposeData.listeRetrouverData) {
        this.dataSet = this.resposeData.listeRetrouverData;
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
