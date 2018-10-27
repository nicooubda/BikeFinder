import { Component } from '@angular/core';
import { NavController,App } from 'ionic-angular';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {WelcomePage} from "../welcome/welcome";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userDetails : any;
  public resposeData : any;
  //public  dataset: any;
  userPostData = {"user_id":"", "token":""};

  constructor(public navCtrl: NavController, public app: App, public authServiceProvider: AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    //this.userPostData.user_id = this.userDetails.user_id;
    //this.userPostData.token = this.userDetails.token;

  // this.getFeed();
  }


  backToWelcome(){
    const root = this.app.getRootNav();
    root.popToRoot();
  }
  logout(){
    //localStorage.clear();

    const root = this.app.getRootNav();
    root.popToRoot();
   //this.navCtrl(Welcge)
    this.navCtrl.push(WelcomePage);

  }

}
