import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";

/**
 * Generated class for the ListeRPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare  var google;
@IonicPage()
@Component({
  selector: 'page-liste-r',
  templateUrl: 'liste-r.html',
})


export class ListeRPage {
  resposeData: any;
  dataSet: any;
  rechercheData = {"date1": "", "date2": ""};

  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider, private  toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeRPage');
  }

  showChart() { // Create the data table.
    // Create the data table.

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');

    //var voler= parseInt(this.dataSet[0].vol);
    var trouver= parseInt(this.dataSet[0].retrouver);
    var voler= parseInt(this.dataSet[0].vol)-parseInt(this.dataSet[0].retrouver);

    data.addRows([
      ['Retrouver', trouver],
      //['Restituer', restituer],
      ['Voler', voler],
    ]);

    // Set chart options
    var options = {
      'title': 'STATISTIQUES',
      'width': 400,
      'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }


  recherche(){
    //Api connection
    this.authServiceProvider.postData(this.rechercheData,"new-stat").then((result)=> {
      this.resposeData = result;

      if(this.resposeData.stat) {
        this.dataSet = this.resposeData.stat;

        console.log( this.dataSet[0].vol);

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
