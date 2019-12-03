import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SongsComponent } from './songs/songs.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResendEmailCodeComponent } from './resend-email-code/resend-email-code.component';
import { AddSongComponent } from './add-song/add-song.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageComponent } from './manage/manage.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'songs', component: SongsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'resend-email', component: ResendEmailCodeComponent},
  {path: 'add-song', component: AddSongComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'manage', component: ManageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
