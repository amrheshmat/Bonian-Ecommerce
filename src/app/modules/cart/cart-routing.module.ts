import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';


const routes: Routes = [
  { path: 'view-cart', component: ViewCartComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: '', component: ViewCartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {
}
