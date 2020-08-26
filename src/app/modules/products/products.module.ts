import { NgModule } from '@angular/core';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component' 
  import { from } from 'rxjs';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/products.service';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [  
    ProductsRoutingModule,
    SharedModule
  ],
  declarations: [
    AllProductsComponent,
    ProductDetailsComponent
  ],
  providers: [
    CategoryService,
    ProductService
    
  ]
})

export class ProductsModule {
}
