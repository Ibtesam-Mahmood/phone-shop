import { Injectable } from '@angular/core';

import { HttpServiceService } from './http-service.service';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {

  // All authenticated http requests go through this service

  authToken: string = null;
  adminAuthToken: string = null;

  user: object;

  constructor(private _http: HttpServiceService, private _cookieService: CookieService) { }

  login(email, password, then){
    // this._http.login(email, password).
    this._http.login(email, password).subscribe((data: HttpResponse<object> ) => {
      this.authToken = this._cookieService.get('auth');
      this.adminAuthToken = this._cookieService.get('adminAuth');
      this.user = data.body['user'];
      then(true);
    });
  }

}
