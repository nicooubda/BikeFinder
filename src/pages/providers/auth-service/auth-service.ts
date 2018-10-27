import { Injectable } from '@angular/core';
import {Http} from "@angular/http";



let apiUrl ="http://192.168.10.18/PHP-Slim-Restful-master/api/";
@Injectable()/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }


  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      // @ts-ignore
      this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json({}));
        }, (err) => {
          reject(err);
        });
    });

  }


}
