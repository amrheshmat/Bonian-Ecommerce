import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from 'src/app/modules/authentication/components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditPersonalInfoComponent } from './components/edit-personal-info/edit-personal-info.component';
import { EditContactInfoComponent } from './components/edit-contact-info/edit-contact-info.component';
import { EditAccountInfoComponent } from './components/edit-account-info/edit-account-info.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule,

  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditPersonalInfoComponent,
    EditContactInfoComponent,
    EditAccountInfoComponent,
    ChangePasswordComponent
  ],
  exports: [
  ],
  providers: [
  ]
})

export class AuthModule {
}
