import { NgModule } from '@angular/core';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderInformationComponent } from './components/order-information/order-information.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { CartService } from './services/cart.service';
import { NavbarCartComponent } from './components/navbar-cart/navbar-cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CartRoutingModule,
    SharedModule
  ],
  declarations: [
    CheckOutComponent,
    OrderInformationComponent,
    ViewCartComponent
  ],
  providers: [
    CartService
  ]
})

export class CartModule {
}
