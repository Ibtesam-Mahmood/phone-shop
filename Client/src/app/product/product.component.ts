import { Component, OnInit, Input } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { ActivatedRoute } from '@angular/router';
import { LoginStateService } from '../login-state.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  //The songID for the song
  songID : string;
  // The song loaded from the songID
  song;
  // The reviews posted on the song
  reviews = [];

  //Review Input fields
  message = '';
  rating = 1;

  constructor(private _http : HttpServiceService, private route: ActivatedRoute, public loginState: LoginStateService) {}

  ngOnInit() {
    // Gets the params within the route
    this.route.params.subscribe(params => {
      this.songID = params['id'];

      // Populates the page
      this.getSong();
      this.getReviews();
    });
  }

  getSong(){
    // Gets new song information for song
    this._http.getSongById(this.songID).subscribe((data) => {
      this.song = data['Song']; // Gets the song from the request
    });
  }

  getReviews(){
    // Gets all the reviews for the song
    this._http.getReviewBySongId(this.songID).subscribe((data) => {
      this.reviews = data['reviews']; // Gets all reviews for this song

      this.reviews.forEach(review => {
        // Gets the user data for each review
        this._http.getUserById(review.userID).toPromise().then(data => {
          // Plugs the user data into the review
          review.user = data['user']['firstName'] + " " + data['user']['lastName'];
        });
      })
    });
  }

  submitReview(){
    this._http.addReview(this.songID, this.rating, this.message).toPromise().then(data => {
      console.log(data);
      let review = data['body']['review'];
      //Adds the user name to the review
      console.log(this.loginState.user);
      review.user = this.loginState.user['firstName'] + " " + this.loginState.user['lastName'];
      this.reviews.push(review); // Displays the review
      this.rating = 1;
      this.message = '';
    });

  }

  //Sets the new rating value
  onRatingChange(newRating){
    this.rating = newRating;
  }

}
