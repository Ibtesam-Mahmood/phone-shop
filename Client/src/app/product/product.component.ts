import { Component, OnInit, Input } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  // The song loaded from the songID
  song;
  // The reviews posted on the song
  reviews = [];

  constructor(private _http : HttpServiceService, private route: ActivatedRoute) {}

  ngOnInit() {
    //Gets the params within the route
    this.route.params.subscribe(params => {
      const songID = params['id'];

      // Gets new song information for song
      this._http.getSongById(songID).subscribe((data) => {
        this.song = data['Song']; // Gets the song from the request
        console.log(data);
      });

      //Gets all the reviews for the song
      this._http.getReviewBySongId(songID).subscribe((data) => {
        this.reviews = data['reviews']; //Gets all reviews for this song

        this.reviews.forEach(review => {
          //Gets the user data for each review
          this._http.getUserById(review.userID).toPromise().then(data => {
            //Plugs the user data into the review
            review.user = data['user']['firstName'] + " " + data['user']['lastName'];
            review.userId = data['user']['_id'];
          });
        })
      });


    })


  }

}
