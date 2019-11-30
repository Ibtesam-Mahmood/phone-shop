import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  images: string[];

  constructor() { }

  ngOnInit() {
    this.images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  }

}
