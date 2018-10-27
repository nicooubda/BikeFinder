import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';

import {HomePage} from "../pages/home/home";
import {ListePostePage} from "../pages/liste-poste/liste-poste";
import {ListeRetrouverPage} from '../pages/liste-retrouver/liste-retrouver';
import {ListeVolPage} from "../pages/liste-vol/liste-vol";
import {ListeEnginRestituePage} from "../pages/liste-engin-restitue/liste-engin-restitue";
import {RecherchePage} from "../pages/recherche/recherche";
import {ListeRPage} from "../pages/liste-r/liste-r";
// @ts-ignore
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = WelcomePage;
  menus = [
    {title: 'Poste',component: ListePostePage},
    {title: 'Vol',component: ListeVolPage},
    {title: 'Retrouver',component: ListeRetrouverPage},
    {title: 'Restitution',component: ListeEnginRestituePage},
    {title: 'Recherche',component: RecherchePage},
    {title: 'Statistiques',component: ListeRPage},
    {title: 'Home',component: HomePage},
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
  onPage(m){
    this.rootPage = m.component;
  }

}
