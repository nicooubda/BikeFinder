import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
//import {AuthServiceProvider} from '../providers/auth-service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {WelcomePage} from "../pages/welcome/welcome";
import {LoginPage} from "../pages/login/login";
import {SignupPage} from "../pages/signup/signup";
import { HttpModule } from "@angular/http";
import {AuthServiceProvider} from "../pages/providers/auth-service/auth-service";
import {AjouterTrouverPage} from "../pages/ajouter-trouver/ajouter-trouver";
import {AjouterVolPage} from "../pages/ajouter-vol/ajouter-vol";
import {PostePage} from "../pages/poste/poste";
import {ListePostePage} from '../pages/liste-poste/liste-poste';

import {MomentModule} from 'angular2-moment';

import {ListeRetrouverPage} from "../pages/liste-retrouver/liste-retrouver";
// @ts-ignore
import { SMS } from '@ionic-native/sms';
import {ListeVolPage} from '../pages/liste-vol/liste-vol';
import {ListeEnginRestituePage} from "../pages/liste-engin-restitue/liste-engin-restitue";
import {RestitutionPage} from "../pages/restitution/restitution";
// @ts-ignore
import { EmailComposer } from '@ionic-native/email-composer';
import {RecherchePage} from "../pages/recherche/recherche";
import {ListeRPage} from "../pages/liste-r/liste-r";
// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,ListeRPage,
    TabsPage, WelcomePage, LoginPage, SignupPage, AjouterTrouverPage, AjouterVolPage, PostePage, ListePostePage,ListeRetrouverPage,ListeVolPage,ListeEnginRestituePage,RestitutionPage,RecherchePage
  ],
  imports: [
    BrowserModule,HttpModule,MomentModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,ListeRPage,
    TabsPage ,RecherchePage, WelcomePage, LoginPage, SignupPage, AjouterTrouverPage, AjouterVolPage, PostePage, ListePostePage, ListeRetrouverPage,ListeVolPage,ListeEnginRestituePage,RestitutionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,AuthServiceProvider,EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SMS
    ]
})
export class AppModule {}




