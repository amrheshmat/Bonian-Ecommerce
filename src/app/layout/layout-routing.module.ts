import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';
 

const routes: Routes = [
  {
    path: '', component: FullLayoutComponent,
    children: [
      {
          path: '', loadChildren: () => import('../modules/landing-page/landing-page.module').then(m => m.LandingPageModule)
      }
  ]

  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
