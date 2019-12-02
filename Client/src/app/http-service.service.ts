import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Config } from 'protractor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private _http : HttpClient) { }

  //Song endpoints
  getAllSongs(){
    return this._http.get('/api/songs/get');
  }

  //Auth enpoints

  //Used to allow the user to login
  login(email, password) {
    return this._http.post(
      '/api/auth/login',
      {email, password},
      {observe: 'response', withCredentials: true, headers: new HttpHeaders({"Content-Type": "application/json"})}
    );
  }

  //Used to sign up the user and end verification email
  signup(user){
    return this._http.post(
      '/api/auth/signup',
      user,
      {observe: 'response', withCredentials: true, headers: new HttpHeaders({"Content-Type": "application/json"})}
    );
  }

  //Used to resend the users verification email
  resendVerification(email, callBack){
    return this._http.post(
      '/api/auth/resend-verification/' + email,
      {},
      {observe: 'response', withCredentials: true, headers: new HttpHeaders({"Content-Type": "application/json"})}
    ).toPromise().then(data => {
      callBack(true);
    }).catch(err => {
      callBack(false);
    });
  }


}
