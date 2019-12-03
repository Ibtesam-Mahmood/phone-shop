import { Component, OnInit } from '@angular/core';

import { LoginStateService } from '../login-state.service';
import { Router } from '@angular/router';

//The persistant navigator above the page content

@Component({
  selector: 'app-navigatior',
  templateUrl: './navigatior.component.html',
  styleUrls: ['./navigatior.component.scss']
})
export class NavigatiorComponent implements OnInit {

  constructor(public loginState: LoginStateService, private router: Router) { }

  ngOnInit() {
  }

  // Logs the user out of the system
  logout(){
    this.loginState.logout();
  }

}
