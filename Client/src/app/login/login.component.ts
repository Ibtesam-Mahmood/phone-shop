import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {


  // The control for the login form
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    // Defines the form group and all the validators applie by name
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') // Email input validation
      ]),
      password: new FormControl('', [
        Validators.required
      ]),

    });
  }

  // Logs the user in
  login(){
    return;
  }


  // Getters for form input fields
  get email(){
    return this.form.get('email');
  }
  get password(){
    return this.form.get('password');
  }



}
