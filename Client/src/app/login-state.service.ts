import { Injectable } from '@angular/core';

import { HttpServiceService } from './http-service.service';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {

  // All authenticated http requests go through this service

  //Used to store the login objects such as authToken, adminToken, and user
  myStorage: Storage = window.localStorage;

  constructor(private _http: HttpServiceService, private _cookieService: CookieService) { }


  /*
    Login and Sign up
  */

  //Logs in the user to the system
  login(email, password, then){
    // this._http.login(email, password).
    this._http.login(email, password).toPromise().then((data) => {
      this.myStorage.setItem('authToken', this._cookieService.get('auth'));
      this.myStorage.setItem('adminAuthToken', this._cookieService.get('adminAuth'));
      this.myStorage.setItem('user', JSON.stringify(data.body['user']) + "");
      then(true);
    }).catch(err => {
      then(false, err);
    });
  }

  //Signs the user up for the system
  signup(email, password, fName, lName, then){
    this._http.signup({email, password, lastName: lName, firstName: fName}).toPromise().then(data => {
      then(false);
    }).catch(err => {
      then(true, err);
    });
  }

  logout(){
    // Logs the user out and deletes the auth cookie
    this.myStorage.removeItem('auth');
    this.myStorage.removeItem('adminAuth');
    this.myStorage.removeItem('user');
    this._cookieService.delete('adminAuth');
    this._cookieService.delete('auth');
  }

  //Adds a song to the server
  addSong(name, artist, album, img){
    this._http.addSong({name, artist, img, album});
  }

  get authToken(){return this.myStorage.getItem('authToken')}
  get adminAuthToken(){return this.myStorage.getItem('adminAuthToken')}
  get user(){
    const storedUser = this.myStorage.getItem('user');
    if (storedUser === null) {return null;}
    else{ return JSON.parse(storedUser); }
  }

}
