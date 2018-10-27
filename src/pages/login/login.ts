import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {AuthServiceProvider} from  '../providers/auth-service/auth-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  resposeData: any;
  public userData = {"username": "", "password": ""};

  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    //Api connection
    if (this.userData.username && this.userData.password)
      this.authServiceProvider.postData(this.userData, "login").then((result) => {
        this.resposeData = result;
        console.log(this.resposeData);
        if(this.resposeData.userData) {
          localStorage.setItem('userData', JSON.stringify(this.resposeData))
          this.navCtrl.push(TabsPage);
        }else{
          this.presentToast("Username et mot de passe invalide");}
      }, (err) => {
        // Error log
      });
     else {
      this.presentToast("Mot de passe ou Username incorrect")
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
      });
    toast.present();

  }





}
