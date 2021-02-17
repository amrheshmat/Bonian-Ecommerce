import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { PaymentsComponent } from '../payments/components/payments.component';
import { OrdersComponent} from '../orders/components/orders.component';



const routes: Routes = [
  { path: 'view-cart', component: ViewCartComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: '', component: ViewCartComponent },
  {
    path: 'payments', component: PaymentsComponent
  },{
    path: 'orders', component: OrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {
}
