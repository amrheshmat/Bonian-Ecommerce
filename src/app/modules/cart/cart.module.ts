import { NgModule } from '@angular/core';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderInformationComponent } from './components/order-information/order-information.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { CartService } from './services/cart.service';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { CategoryService } from '../products/services/category.service';
import { SalesOrderService } from './services/sales-order.service';
import { CartInformationComponent } from './components/cart-information/cart-information.component';

@NgModule({
  imports: [
    CartRoutingModule,
    SharedModule
  ],
  declarations: [
    CheckOutComponent,
    OrderInformationComponent,
    CartInformationComponent,
    ViewCartComponent,
    CartItemsComponent
  ],
  providers: [
    CategoryService,
    SalesOrderService
  ]
})

export class CartModule {
}
