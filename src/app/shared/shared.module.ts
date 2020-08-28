import { NgModule } from '@angular/core';
import { NavbarCartComponent } from '../modules/cart/components/navbar-cart/navbar-cart.component';
import { MaterialModule } from './modules/material/material.module';
import { CommonModule } from '@angular/common';
import { RelatedProductComponent } from '../modules/products/components/related-product/related-product.component';
import { ProductCardComponent } from '../modules/products/components/product-card/product-card.component';
import { RouterModule } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarCartComponent,
    RelatedProductComponent,
    ProductCardComponent
  ],

  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule ,
    FormsModule
  ],

  exports: [
    MaterialModule,
    CommonModule,
    NavbarCartComponent,
    RelatedProductComponent,
    ProductCardComponent,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [

  ]

})
export class SharedModule { }
