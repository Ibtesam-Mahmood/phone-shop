import { Component, OnInit } from '@angular/core';
import { LoginStateService } from '../login-state.service';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  // The admin check to see if the user really is an checkAdmin
  // Impemented for security reasons
  checkAdmin: boolean = null;

  // Admin control variables
  users = []; // List of all users on the pratform
  songs = []; // List of all songs on the platform

  // Used to toggle the admins view over user and songs
  viewToggle = 'users';

  constructor(public loginState: LoginStateService, private _http: HttpServiceService) { }

  ngOnInit() {

    //Checks if the user is logged in
    if(this.loginState.user){
       // Verfies if the user is an admin
      this._http.checkAdmin(this.loginState.user._id).toPromise().then(() => {
        // Admin test succeeded
        this.checkAdmin = true;
        this.loadAdminControls();
      }).catch(() => {
        // Admin check failed
        this.checkAdmin = false;
      });
    }
    else{
      // Admin check failed
      this.checkAdmin = false;
    }

  }

  // Loads the admin control data
  loadAdminControls(){

    // Gets all the songs on the system
    this._http.getAllSongs().subscribe(data => {
      this.songs = data["Songs"];
    });

    // Gets all the users on the system
    this._http.getAllUsers().subscribe(data => {
      this.users = data['users'];
    });
  }

  // On change for the select to manage the admin view
  onViewChange(val){
    this.viewToggle = val;
  }

  // Toggles the users activation value
  onToggleUserActivation(id, toggle){
    this._http.toggleUserActivation(id, toggle).toPromise().then(() => {
      // Updates the users activation toggle value on successful request
      this.users.forEach(user => {
        if(user._id === id){
          user.isActive = toggle;
          return;
        }
      })
    });
  }

  // Toggles the users isAdmin value
  onToggleUserAdmin(id, toggle){
    this._http.toggleUserAdmin(id, toggle).toPromise().then(() => {
      // Updates the users admim toggle value on successful request
      this.users.forEach(user => {
        if(user._id === id){
          user.isAdmin = toggle;
          return;
        }
      })
    });
  }

  // Toggles the songs hidden value
  onToggleSongVisibility(id, toggle){
    this._http.toggleSongVisibility(id, toggle).toPromise().then(() => {
      // Updates the songs hidden toggle value on successful request
      this.songs.forEach(song => {
        if(song._id === id){
          song.hidden = toggle;
          return;
        }
      });
    });
  }

  // Deletes the user from the system
  deleteUser(id){
    this._http.deleteUser(id).subscribe(() => {
      // On successful delete, removes the user from the List
      this.users = this.users.filter(user => user._id !== id);
    });
  }

  // Deletes the song from the system
  deleteSong(id){
    this._http.deleteSong(id).subscribe(() => {
      // On successful delete, removes the song from the List
      this.songs = this.songs.filter(song => song._id !== id);
    });
  }


}
