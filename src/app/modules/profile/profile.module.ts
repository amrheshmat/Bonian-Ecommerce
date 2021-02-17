import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { EditAccountInfoComponent } from './components/edit-account-info/edit-account-info.component';


@NgModule({
  declarations: [EditAccountInfoComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
