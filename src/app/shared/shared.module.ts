import { NgModule } from '@angular/core';
import { NavbarCartComponent } from '../modules/cart/components/navbar-cart/navbar-cart.component';
import { MaterialModule } from './modules/material/material.module';
import { CommonModule } from '@angular/common';
import { RelatedProductComponent } from '../modules/products/components/related-product/related-product.component';
import { ProductCardComponent } from '../modules/products/components/product-card/product-card.component';
import { RouterModule } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MvcPartialDirective } from './directives/mvc-partial.directive';
import { MVCHTMLService } from './services/mvc-html.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    NavbarCartComponent,
    RelatedProductComponent,
    ProductCardComponent,
    MvcPartialDirective
  ],

  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule ,
    FormsModule,
    InfiniteScrollModule

  ],

  exports: [
    MaterialModule,
    CommonModule,
    NavbarCartComponent,
    RelatedProductComponent,
    ProductCardComponent,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MvcPartialDirective,
    InfiniteScrollModule
  ],

  providers: [
    MVCHTMLService
  ]

})
export class SharedModule { }
