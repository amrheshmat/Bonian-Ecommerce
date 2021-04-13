import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from 'src/app/modules/authentication/components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditPersonalInfoComponent } from './components/edit-personal-info/edit-personal-info.component';
import { EditAccountInfoComponent } from './components/edit-account-info/edit-account-info.component';
import { EditContactInfoComponent } from './components/edit-contact-info/edit-contact-info.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile-EditPersonalInfo', component: EditPersonalInfoComponent },
  { path: 'profile-EditAccountInfo', component: EditAccountInfoComponent },
  { path: 'profile-EditContactInfo', component: EditContactInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
  
}
