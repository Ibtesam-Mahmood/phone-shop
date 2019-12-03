import { Component, OnInit } from '@angular/core';

import { HttpServiceService } from '../http-service.service';
import { LoginStateService } from '../login-state.service';

import * as JsSearch from 'js-search';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  // Holds the list of songs to be displayed
  songs: object[];

  // The songs to be displayed past the search filter and organization filter
  songsDisplay: object[];

  // Used to perform search on the song list
  search = null;

  // The param for the search
  searchParam = '';

  // Holds the model for the organization list
  organize = 'pop-a';

  constructor(private _http: HttpServiceService, public loginState: LoginStateService) { }

  ngOnInit() {
    // Loads all the songs onto the page
    this._http.getAllSongs("hidden=false").subscribe(data => {
      this.songs = data['Songs'];

      // Defines the search controller
      this.search = new JsSearch.Search('_id');
      // Adds the parameters to search from
      this.search.addIndex('name');
      this.search.addIndex('album');
      this.search.addIndex('artist');

      // Adds the items to the search
      this.search.addDocuments(this.songs);

      // Sets the songs to display
      this.songsDisplay = this.songs;

      // Sets the innitial organization filter
      this.onFilterChange(this.organize);

      // Gets all the review data for the songs
      this.getReviewDataForSongs();
    })
  }

  // Gets the review data for the list of songs
  getReviewDataForSongs(){
    this.songs.forEach(song => {
      this._http.getSongReviewData(song['_id']).subscribe(data => {

        // Sets the review and rating data to the song
        song['reviews'] = data['reviews'];
        song['rating'] = data['rating'];

        // Sets the songs and updates the view
        this.songsDisplay = this.songs;
        this.onFilterChange(this.organize);
      });
    });
  }

  // Manages filtering the songs list to show based off the search param
  onSearchChange(val){
    this.searchParam = val;

    // If search param is empty shows the full list
    if(val == '') return this.songsDisplay = this.songs;

    // Search the songs
    this.songsDisplay = this.search.search(val);
  }

  // Manages changing the organization filter
  onFilterChange(val: string){
    this.organize = val;
    const filter = val.split('-');
    // organization by popularity
    if(filter[0] == 'pop'){
      return this.organizeByPopularity(filter[1] === 'd');
    }
    // organization by name
    else {
      return this.organizeByName(filter[1] === 'd');
    }
  }

  // Organizes the list of songs by popularity
  // reverses the list if reverse if true
  organizeByPopularity(reverse){
    this.songsDisplay.sort((a, b) => {
      if(reverse){
        return a['rating'] - b['rating'];
      }
      return b['rating'] - a['rating'];
    });
  }

  // Organizes the list of songs by name
  // reverses the list if reverse if true
  organizeByName(reverse){
    this.songsDisplay.sort((a, b) => {
      if(reverse){
        return b['name'].localeCompare(a['name']);
      }
      return a['name'].localeCompare(b['name']);
    });
  }

}
