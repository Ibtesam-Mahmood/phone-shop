import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-song-tile',
  templateUrl: './song-tile.component.html',
  styleUrls: ['./song-tile.component.scss']
})
export class SongTileComponent implements OnInit {

  //The inputted song into this tile
  @Input() song;

  constructor() { }

  ngOnInit() {
  }

}
