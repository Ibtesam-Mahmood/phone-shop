import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private _http : HttpClient) { }

  getAllSongs(){
    return this._http.get('/api/songs/get');
  }

}
