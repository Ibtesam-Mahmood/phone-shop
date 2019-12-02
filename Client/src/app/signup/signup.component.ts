import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import { matchValidator } from '../helpers/validator.helper';
import { LoginStateService } from '../login-state.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // The control for the login form
  form: FormGroup;

  // Holds the sign up state the user is in
  // null - no state
  // sent - email sent
  // email - email not unique
  // server - erver error
  signUpState: string = null;

  constructor(private _loginState: LoginStateService) { }

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
    this._loginState.signup( this.email.value, this.password.value, this.fName.value, this.lName.value, (failed, err) => {
      if(!failed){
        // No error, email sent
        this.signUpState = 'sent';
      }
      else {
        if(err.status === 403) {
          // Email not unique
          this.signUpState = 'email';
        }
        else if(err.status == 404){
          // Server error
          this.signUpState = 'server';
        }
      }
    });
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
