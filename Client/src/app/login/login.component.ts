import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import { LoginStateService } from '../login-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {


  // The control for the login form
  form: FormGroup;

  // Holds the status for when login fails
  // user - no user found
  // pass - incorrect password or email
  // disabled - user inactive
  loginFailedStatus: string = null;

  constructor(private _loginState: LoginStateService, private router: Router) { }

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
    this._loginState.login(this.email.value, this.password.value, (val, err) => {
      if(val){
        // Login Successful
        return this.router.navigate(['/songs']); // Routers to the songs page when logged in
      }
      else{
        // Login Failed
        if(err.status === 404){
          // No user found
          this.loginFailedStatus = 'user';
        }
        else if(err.status === 401){
          // Email or password incorrect
          this.loginFailedStatus = 'pass';
        }
        else if(err.status === 403){
          // User Deactivated
          this.loginFailedStatus = 'disabled';
        }
      }
    });
  }


  // Getters for form input fields
  get email(){
    return this.form.get('email');
  }
  get password(){
    return this.form.get('password');
  }



}
