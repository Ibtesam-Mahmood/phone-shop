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

  // Used to get a user by thier ID
  getUserById(id){
    return this._http.get('/api/user/get/' + id);
  }

  // Used to get all users on the system
  getAllUsers(){
    return this._http.get('api/user/get');
  }

  // Deletes the user from the system
  deleteUser(id){
    return this._http.delete('api/user/delete/' + id)
  }


  //Review endpoints

  //Retreiving all reviews for a song
  getReviewBySongId(id){
    return this._http.get('/api/review/get/song/' + id);
  }

  // Retreiving all reviews by a user
  getReviewByUserId(id){
    return this._http.get('/api/review/get/user/' + id);
  }

  // Manages adding a review to a song
  addReview(songId, rating, content){
    return this._http.post(
      '/api/review/add/' + songId,
      {rating, content},
      {observe: 'response', withCredentials: true, headers: new HttpHeaders({"Content-Type": "application/json"})}
    );
  }

  // Deletes the review from the system
  deleteReview(id){
    return this._http.delete('/api/review/delete/' + id);
  }

  //Song endpoints

  //Used to get all songs
  getAllSongs(){
    return this._http.get('/api/songs/get');
  }

  // Retreiving all reviews by a user
  getSongsByUserId(id){
    return this._http.get('/api/songs/get/user/' + id);
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

  // Gets the song by id
  getSongById(id){
    return this._http.get('/api/songs/get/' + id);
  }

  // Delets the song from the system
  deleteSong(id){
    return this._http.delete('/api/songs/delete/' + id)
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


  // Admin Endpoint

  // Used to verify that the user is an admin
  checkAdmin(id){
    return this._http.get('/api/admin/check');
  }

  // Toggles the activation for the user
  toggleUserActivation(id, toggle){
    return this._http.post(
      'api/admin/toggle/user/' + id,
      {toggle},
      {withCredentials: true, headers: new HttpHeaders({"Content-Type": "application/json"})}
    );
  }

  // Toggles the activation for the user
  toggleUserAdmin(id, toggle){
    return this._http.post(
      'api/admin/toggle/admin/' + id,
      {toggle},
      {withCredentials: true, headers: new HttpHeaders({"Content-Type": "application/json"})}
    );
  }

  // Toggles the visibility for a song
  toggleSongVisibility(id, toggle){
    return this._http.post(
      'api/admin/toggle/song/' + id,
      {toggle},
      {withCredentials: true, headers: new HttpHeaders({"Content-Type": "application/json"})}
    );
  }


}
