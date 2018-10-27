import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import { AlertController } from 'ionic-angular';

// @ts-ignore
import { mobiscroll } from '@mobiscroll/angular';
import {ListePostePage} from "../liste-poste/liste-poste";
/**
 * Generated class for the PostePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-poste',
  templateUrl: 'poste.html',
})
export class PostePage {
  resposeData : any;
  posteData = {"nomPoste":"","numPoste":"","chefPoste":"","region":"","ville":"","adresse":"","telephone":""};
  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider,private  toastCtrl: ToastController, private alertCtrl: AlertController)  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostePage');
  }

  newPoste(){
    //Api connection
    if(this.posteData.nomPoste && this.posteData.numPoste && this.posteData.chefPoste && this.posteData.region && this.posteData.ville && this.posteData.adresse && this.posteData.telephone)
      this.authServiceProvider.postData(this.posteData,"new-poste").then((result)=> {
        this.resposeData = result;

        if(this.resposeData.error ){
          this.presentToast("Poste déja existant");
         // this.presentToast("Poste déja enregistré");
          console.log(this.resposeData);

          localStorage.setItem('posteData',JSON.stringify(this.resposeData));

        }
        else{ console.log("User already exists");
          //console.log(this.resposeData.resposeData);
          this.presentAlert();
          this.navCtrl.push(ListePostePage);

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
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Enregistrement',
      subTitle: 'Poste enregistré',
      buttons: ['Ok']
    });
    alert.present();
  }





}
