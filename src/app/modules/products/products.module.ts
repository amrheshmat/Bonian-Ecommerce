import { NgModule } from '@angular/core';
import { ProductDetailsComponent } from './components/product-details/product-details.component' 
  import { from } from 'rxjs';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/products.service';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SmallFilterAsideComponent } from './components/small-filter-aside/small-fiter-aside.component';
import { LargeFilterAsideComponent } from './components/large-filter-aside/large-filter-aside.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AllProductsComponent } from './components/all-products/all-products.component';

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
    ProductCardComponent
  ],
  providers: [
    CategoryService,
    ProductService
    
  ]
})

export class ProductsModule {
}
