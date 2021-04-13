import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../modules/authentication/components/login/login.component';
import { AboutUsComponent } from '../modules/home/components/about-us/about-us.component';
import { CasherOrderComponent } from '../modules/order/components/casher-order/casher-order.component';
import { OrderDetailsComponent } from '../modules/order/components/order-details/order-details.component';
import { OrderPrepareComponent } from '../modules/order/components/order-prepare/order-prepare.component';
import { PaymentStatusComponent } from '../modules/payments/components/payment-status/payment-status.component';
import { FullLayoutComponent } from './components/full-layout/full-layout.component'; 


const routes: Routes = [
  {
    path: '', component: FullLayoutComponent,
    children: [
      {
        path: '', loadChildren: () => import('../modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'products', loadChildren: () => import('../modules/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'cart', loadChildren: () => import('../modules/cart/cart.module').then(m => m.CartModule)
      },
      {
        path: 'orders', loadChildren: () => import('../modules/order/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'Ecommerce/Orders',  component: CasherOrderComponent
      },
      {
        path: 'Ecommerce/prepareOrder',  component: OrderPrepareComponent
      },
      {
        path: 'payments', loadChildren: () => import('../modules/payments/payments.module').then(m => m.PaymentsModule)
      },
      
      {
        path: 'searchResult/:searchValue', loadChildren: () => import('../modules/payments/payments.module').then(m => m.PaymentsModule)
      },{
        path: 'order/order-details/:orderId/:orderStatus/:total', component: OrderDetailsComponent
      },{
        path: 'paymentStatus', component: PaymentStatusComponent
      },
      {
        path: 'aboutUs', component: AboutUsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
