import { NgModule } from '@angular/core';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component' 
  import { from } from 'rxjs';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/products.service';
import { ProductsRoutingModule } from './products-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [  
    CommonModule,
    ProductsRoutingModule
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
