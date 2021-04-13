import { NgModule } from '@angular/core';
import { ProductDetailsComponent } from './components/product-details/product-details.component'
import { from } from 'rxjs';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/products.service';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SmallFilterAsideComponent } from './components/small-filter-aside/small-fiter-aside.component';
import { LargeFilterAsideComponent } from './components/large-filter-aside/large-filter-aside.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { CartInformationComponent } from './components/cart-information/cart-information.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { OrderInformationComponent } from './components/order-information/order-information.component';

@NgModule({
  imports: [
    ProductsRoutingModule,
    SharedModule
  ],
  declarations: [
    AllProductsComponent,
    ProductDetailsComponent,
    SmallFilterAsideComponent,
    LargeFilterAsideComponent,
    ProductModalComponent,
    CartInformationComponent,
    ViewCartComponent,
    CartItemsComponent,
    OrderInformationComponent
  ],
  providers: [
    CategoryService,
    ProductService

  ]
})

export class ProductsModule {
}
