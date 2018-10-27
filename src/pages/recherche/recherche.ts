import { Component } from '@angular/core';
import { IonicPage, NavController,  ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {count} from "rxjs/operators";

/**
 * Generated class for the RecherchePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recherche',
  templateUrl: 'recherche.html',
})
export class RecherchePage {
  resposeData:any;
  rechercheData = {"numPlaque":""};
  dataSet : any;
  volData: any;
  constructor(public navCtrl: NavController,public authServiceProvider: AuthServiceProvider,private  toastCtrl: ToastController) {
    //this.getVol();
  }

  getVol(){
    this.authServiceProvider.postData(this.volData,"liste-vol").then((result)=> {
      this.resposeData = result;
      if(this.resposeData.listeVolData) {
        this.dataSet = this.resposeData.listeVolData;
        // @ts-ignore
        console.log(count(this.dataSet));
      }else{console.log("Erreur de chargement de la liste")}
    }, (err) => {
      // Error log
    });
  }

  recherche(){
    //Api connection


    if(this.rechercheData.numPlaque)
      this.authServiceProvider.postData(this.rechercheData,"recherche").then((result)=> {
        this.resposeData = result;

        if(this.resposeData.error ){
          console.log(this.resposeData);

          //this.navCtrl.push(RecherchePage);
          localStorage.setItem('rechercheData',JSON.stringify(this.resposeData));

        }
        else{ console.log("Information already exists");
          //console.log(this.resposeData.resposeData);
          //this.presentAlert();
          this.dataSet = this.resposeData.rechercheData;
          //this.navCtrl.push(RecherchePage);

        }
      }, (err) => {
        // Error log
      });
    else{
      //this.presentAlert();
      this.presentToast("Veuillez renseigner le numéro de plaque.");
    }
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',


    });
    toast.present();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RecherchePage');
  }

}
