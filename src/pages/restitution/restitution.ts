import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {ListeEnginRestituePage} from "../liste-engin-restitue/liste-engin-restitue";

/**
 * Generated class for the RestitutionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restitution',
  templateUrl: 'restitution.html',
})
export class RestitutionPage {
  resposeData : any;
  userDetails:any;
  restitutionData = {"numPlaque":"","dateRestitution":"","proprietaire":"","user_id":""};
  constructor(public navCtrl: NavController,public authServiceProvider: AuthServiceProvider, private alertCtrl: AlertController,private  toastCtrl: ToastController){
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestitutionPage');
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Enregistrement',
      subTitle: 'Restitution enregistrée',
      buttons: ['Ok']
    });
    alert.present();
  }

  newRestitution(){
    //Api connection
    this.restitutionData.user_id = this.userDetails.user_id;
    console.log(this.userDetails.id);
    if(this.restitutionData.numPlaque  && this.restitutionData.proprietaire)
      this.authServiceProvider.postData(this.restitutionData,"new-restitution").then((result)=> {
        this.resposeData = result;

        if(this.resposeData.error ){
          this.presentToast("Informations déja existantes");
          // this.presentToast("Poste déja enregistré");
          console.log(this.resposeData);

          localStorage.setItem('restitutionData',JSON.stringify(this.resposeData));

        }
        else{ console.log("Information already exists");
          //console.log(this.resposeData.resposeData);
          this.presentAlert();
          this.navCtrl.push(ListeEnginRestituePage);

        }
      }, (err) => {
        // Error log
      });
    else{
      //this.presentAlert();
      this.presentToast("Veuillez renseigner tous les champs.");
    }
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',


    });
    toast.present();

  }

}
