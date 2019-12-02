import { Component, OnInit } from '@angular/core';

import { HttpServiceService } from '../http-service.service';
import { LoginStateService } from '../login-state.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  //Holds the list of songs to be displayed
  songs: object[];

  constructor(private _http: HttpServiceService, public loginState: LoginStateService) { }

  ngOnInit() {
    this._http.getAllSongs().subscribe(data => {
      this.songs = data['Songs'];
    })
  }

}
