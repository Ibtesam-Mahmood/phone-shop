import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import { matchValidator } from '../helpers/validator.helper';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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
      fName: new FormControl('', [
        Validators.required,
      ]),
      lName: new FormControl('', [
        Validators.required,
      ]),

    });

    this.form.addControl("emailConfirm", new FormControl('', [
      Validators.required,
      matchValidator(this.email)
    ]));

    this.form.addControl("passwordConfirm", new FormControl('', [
      Validators.required,
      matchValidator(this.password)
    ]));
  }

  // Logs the user in
  signup() {
    return;
  }


  // Getters for form input fields
  get email() {
    return this.form.get('email');
  }
  get emailConfirm() {
    return this.form.get('emailConfirm');
  }
  get password() {
    return this.form.get('password');
  }
  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }
  get fName() {
    return this.form.get('fName');
  }
  get lName() {
    return this.form.get('lName');
  }

}
