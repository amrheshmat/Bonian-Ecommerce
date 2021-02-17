import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditAccountInfoComponent } from './components/edit-account-info/edit-account-info.component';

const routes: Routes = [
  { path: 'editAccountInfoComponent', component: EditAccountInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
