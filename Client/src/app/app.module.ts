import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigatiorComponent } from './navigatior/navigatior.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './widgets/carousel/carousel.component'

@NgModule({
  declarations: [
    AppComponent,
    NavigatiorComponent,
    HomeComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
