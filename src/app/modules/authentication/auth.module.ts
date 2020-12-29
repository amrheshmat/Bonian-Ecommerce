import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from 'src/app/modules/authentication/components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule,

  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  exports: [
    ProfileComponent
  ],
  providers: [
  ]
})

export class AuthModule {
}
