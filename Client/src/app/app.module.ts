import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigatiorComponent } from './navigatior/navigatior.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './widgets/carousel/carousel.component';
import { SongsComponent } from './songs/songs.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { ResendEmailCodeComponent } from './resend-email-code/resend-email-code.component';
import { CookieService } from 'ngx-cookie-service';
import { AddSongComponent } from './add-song/add-song.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigatiorComponent,
    HomeComponent,
    CarouselComponent,
    SongsComponent,
    LoginComponent,
    SignupComponent,
    ResendEmailCodeComponent,
    AddSongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
