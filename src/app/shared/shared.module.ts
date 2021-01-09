import { NgModule } from '@angular/core';
import { NavbarCartComponent } from '../modules/cart/components/navbar-cart/navbar-cart.component';
import { MaterialModule } from './modules/material/material.module';
import { CommonModule } from '@angular/common';
import { RelatedProductComponent } from '../modules/products/components/related-product/related-product.component';
import { ProductCardComponent } from '../modules/products/components/product-card/product-card.component';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MvcPartialDirective } from './directives/mvc-partial.directive';
import { MVCHTMLService } from './services/mvc-html.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslatorService } from './services/translator.service';

import { HttpHelperService } from './services/http-helper.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { AlertService } from './services/alert.service';

@NgModule({
  declarations: [
    NavbarCartComponent,
    RelatedProductComponent,
    ProductCardComponent,
    MvcPartialDirective,
  ],

  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule,
    ToastrModule.forRoot(), // ToastrModule added
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })


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
    InfiniteScrollModule,
    TranslateModule,
    ToastrModule
  ],

  providers: [
    MVCHTMLService,
    TranslatorService,
    HttpHelperService,
    AlertService
  ]

})
export class SharedModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

