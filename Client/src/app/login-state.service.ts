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

  _authToken: string = null;
  _adminAuthToken: string = null;

  _user: object = null;

  //Used to store the login objects such as authToken, adminToken, and user
  myStorage: Storage = window.localStorage;

  constructor(private _http: HttpServiceService, private _cookieService: CookieService) { }

  login(email, password, then){
    // this._http.login(email, password).
    this._http.login(email, password).subscribe((data: HttpResponse<object> ) => {
      this.myStorage.setItem('authToken', this._cookieService.get('auth'));
      this.myStorage.setItem('adminAuthToken', this._cookieService.get('adminAuth'));
      this.myStorage.setItem('user', data.body['user']);
      then(true);
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

  get authToken(){return this.myStorage.getItem('authToken')}
  get adminAuthToken(){return this.myStorage.getItem('adminAuthToken')}
  get user(){return this.myStorage.getItem('user')}

}
