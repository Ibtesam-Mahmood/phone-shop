import { Component, OnInit } from '@angular/core';
import { LoginStateService } from '../login-state.service';
import { HttpServiceService } from '../http-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // The id for the user passed into the profile page
  userID: string;

  // The user object used to hold the profile information
  user: object;

  // Holds the list of reviews for the user
  reviews = [];

  // Holds the list of songs posted by the user
  songs = [];

  constructor(private _http: HttpServiceService, public loginState: LoginStateService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userID = params['id']; // Gets the id from the url

      //If this is the current user's profile, load the user from the local storage
      if(this.loginState.user != null){
        if(this.userID === this.loginState.user._id){
          this.user = this.loginState.user;
          return this.loadReviewsAndSongs();
        }
      }

      //Load user from server based on id
      return this.loadUser();

    });

  }

  // 3 stage process of loading user, then user reviews, then user songs
  loadUser(){
    this._http.getUserById(this.userID).toPromise().then(data => {
      this.user = data["user"];
      return this.loadReviewsAndSongs(); //Loads reviews after user to ensure user exsists
    });
  }

  // Loads Reviews then songs from the server for this user
  loadReviewsAndSongs(){

    //Gets all reviews by the user
    this._http.getReviewByUserId(this.userID).subscribe(data => {
      this.reviews = data['reviews'];
    });

    //Gets all songs by the user
    this._http.getSongsByUserId(this.userID).subscribe(data => {
      this.songs = data['Songs'];
    });
  }

}
