import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-song-tile',
  templateUrl: './song-tile.component.html',
  styleUrls: ['./song-tile.component.scss']
})
export class SongTileComponent implements OnInit {

  @Input() song;

  constructor() { }

  ngOnInit() {
    console.log(this.song);
  }

}
