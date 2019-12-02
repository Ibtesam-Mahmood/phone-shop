import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Config } from 'protractor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private _http : HttpClient) { }


  //User Endpoints
  getUserById(id){
    return this._http.get('/api/user/get/' + id);
  }


  //Review endpoints

  //Retreiving all reviews for a song
  getReviewBySongId(id){
    return this._http.get('/api/review/get/song/' + id);
  }

  // Manages adding a review to a song
  addReview(songId, rating, content){
    return this._http.post(
      '/api/review/add/' + songId,
      {rating, content},
      {observe: 'response', withCredentials: true, headers: new HttpHeaders({"Content-Type": "application/json"})}
    );
  }

  deleteReview(id){
    return this._http.delete('/api/review/delete/' + id);
  }

  //Song endpoints

  //Used to get all songs
  getAllSongs(){
    return this._http.get('/api/songs/get');
  }

  //used to add a song to the database
  addSong(song){
    return this._http.post(
      '/api/songs/add',
      song,
      {observe: 'response', withCredentials: true, headers: new HttpHeaders({"Content-Type": "application/json"})}
    ).subscribe(data => {

    });
  }

  getSongById(id){
    return this._http.get('/api/songs/get/' + id);
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
