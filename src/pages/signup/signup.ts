import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, ToastController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";
import {AuthServiceProvider} from  '../providers/auth-service/auth-service';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  resposeData: any;
  postedeleteData: any;
  dataSet: any;
  posteData: any;
  userData = {"username": "", "name": "", "email": "", "password": "", "nomPoste":""};

  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider, private  toastCtrl: ToastController, private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    //Api connection
    if (this.userData.username && this.userData.password && this.userData.email && this.userData.name)
      this.authServiceProvider.postData(this.userData, "signup").then((result) => {
        this.resposeData = result;
        if (this.resposeData.error) {
          this.presentToast("Informations existantes")
          console.log(this.resposeData);


        }
        else {
          console.log("User already exists");
          localStorage.setItem('userData', JSON.stringify(this.resposeData));
          this.navCtrl.push(TabsPage);
          this.presentAlert();
        }
      }, (err) => {
        // Error log
      });
    else {
      this.presentToast("Veuillez renseigner tous les champs")
    }
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    });
    toast.present();

  }

  getPoste() {
    this.authServiceProvider.postData(this.posteData, "liste-poste").then((result) => {
      this.resposeData = result;
      if (this.resposeData.listePosteData) {
        this.dataSet = this.resposeData.listePosteData;
        console.log(this.dataSet);
      } else {
        console.log("Erreur de chargement de la liste")
      }
    }, (err) => {
      // Error log
    });
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Enregistrement',
      subTitle: 'Utilisateur enregistré avec succès.',
      buttons: ['Ok']
    });
    alert.present();
  }

}
