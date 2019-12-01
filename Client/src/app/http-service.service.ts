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
  login(email, password) {
    return this._http.post(
      '/api/auth/login',
      {email, password},
      {observe: 'response', withCredentials: true, headers: new HttpHeaders({"Content-Type": "application/json"})}
    );
  }

}
