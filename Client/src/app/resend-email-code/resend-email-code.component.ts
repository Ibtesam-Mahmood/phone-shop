import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-resend-email-code',
  templateUrl: './resend-email-code.component.html',
  styleUrls: ['./resend-email-code.component.scss']
})
export class ResendEmailCodeComponent implements OnInit {

  //Holds the state value of if the email was sent or not
  sent: boolean = null;

  // The control for the login form
  form: FormGroup;

  constructor(private _http: HttpServiceService) { }

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

  resend(){
    this._http.resendVerification(this.email.value, (success) => {
      this.sent = success;
    });
  }

  // Getters for form input fields
  get email(){
    return this.form.get('email');
  }

}
