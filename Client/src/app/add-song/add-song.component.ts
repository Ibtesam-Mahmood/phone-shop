import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {

  // The control for the login form
  form: FormGroup;

  constructor(private _http: HttpServiceService, private router: Router) { }

  ngOnInit() {
    // Defines the form group and all the validators applie by name
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      artist: new FormControl('', [
      ]),
      album: new FormControl('', [
      ]),
      img: new FormControl('', [
      ]),

    });
  }

  // Logs the user in
  addsong(){
    return this._http.addSong({
      name: this.name.value,
      artist: this.artist.value,
      album: this.album.value,
      img: this.img.value
    }).subscribe(data => {
      // Route to songs page
      return this.router.navigate(['/songs']);
    });
  }


  // Getters for form input fields
  get name(){
    return this.form.get('name');
  }
  get artist(){
    return this.form.get('artist');
  }
  get album(){
    return this.form.get('album');
  }
  get img(){
    return this.form.get('img');
  }

}
