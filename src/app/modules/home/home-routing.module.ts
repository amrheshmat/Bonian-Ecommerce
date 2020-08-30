import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
    // RouterModule.forRoot(routes, {
    //   anchorScrolling: 'enabled',
    // }),
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
