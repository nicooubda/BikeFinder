import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import { SMS } from '@ionic-native/sms';
import {ListeRetrouverPage} from "../liste-retrouver/liste-retrouver";
import {EmailComposer} from "@ionic-native/email-composer";

/**
 * Generated class for the AjouterTrouverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajouter-trouver',
  templateUrl: 'ajouter-trouver.html',
})
export class AjouterTrouverPage {
  resposeData : any;
  public userDetails : any;
  retrouverData = {"dateRetrouver":"","numPlaque":"","numChassis":"","idVoleur":"","status":"","lieu":"","autres":"","user_id":""};

  constructor(public navCtrl: NavController,  public authServiceProvider: AuthServiceProvider,private  toastCtrl: ToastController, private alertCtrl: AlertController,private sms: SMS,private emailComposer: EmailComposer) {
      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;
  }
  //this.retrouverData.status = "";
  ionViewDidLoad() {
    console.log('ionViewDidLoad AjouterTrouverPage');
  }


  newRetrouver(){
    this.retrouverData.status = "0";
    this.retrouverData.user_id = this.userDetails.user_id;
    //Api connection
    if( this.retrouverData.dateRetrouver && this.retrouverData.numPlaque && this.retrouverData.numChassis && this.retrouverData.lieu )
      this.authServiceProvider.postData(this.retrouverData,"new-retrouver").then((result)=> {
        this.resposeData = result;
        if(this.resposeData.error){
          this.presentToast("Informations déja existantes.")

        }
        else{ console.log("Informations  enregistrées");
          this.presentAlert();
          this.navCtrl.push(ListeRetrouverPage);
          console.log(this.resposeData);
          localStorage.setItem('retrouverData',JSON.stringify(this.resposeData));

        }
      }, (err) => {
        // Error log
      });
    else{
      this.presentToast("Veuillez renseigner tous les champs");

    }
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();

  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Enregistrement',
      subTitle: 'Engin enregistré avec succès',
      buttons: ['Ok']
    });
    alert.present();
  }
 senSMS(){
    var options:{
      replaceLineBreaks: true,
      android:{
        intent:'INTENT'
      }
    }
    this.sms.send ('+84868712613','TEST',options).then(()=>{
      console.log("Worked");
    }).catch((err)=>{
        alert(JSON.stringify(err))});
 }
 sendEmail(){
   let email = {
     to: 'nicoubda@gmail.com',
     cc: 'brahimalikoreimy2@gmail.com',
     bcc: ['nicoubda@gmail.com', 'jane@doe.com'],
     attachments: [

     ],
     subject: 'TEST EMAIL',
     body: 'How are you? Nice greetings from Leipzig',
     isHtml: true
   };
   this.emailComposer.open(email);

 }
}
