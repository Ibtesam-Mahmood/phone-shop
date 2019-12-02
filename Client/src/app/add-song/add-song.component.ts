import { Component, OnInit } from '@angular/core';
import { LoginStateService } from '../login-state.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {

  // The control for the login form
  form: FormGroup;

  constructor(private _loginState: LoginStateService) { }

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
    return this._loginState.addSong(this.name.value, this.artist.value, this.album.value, this.img.value);
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
