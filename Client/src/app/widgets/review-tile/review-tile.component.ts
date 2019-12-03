import { Component, OnInit, Input } from '@angular/core';
import { LoginStateService } from 'src/app/login-state.service';

@Component({
  selector: 'app-review-tile',
  templateUrl: './review-tile.component.html',
  styleUrls: ['./review-tile.component.scss']
})
export class ReviewTileComponent implements OnInit {

  @Input() review;

  constructor(public loginState: LoginStateService) { }

  ngOnInit() {
  }

}
