import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout-components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarWithCartComponent } from './layout-components/navbar-with-cart/navbar-with-cart.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductsComponent } from './Products/Products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsService } from './services/products.service';
import { OrderInformationComponent } from './order-information/order-information.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarWithCartComponent,
    LandingPageComponent,
    ProductsComponent,
    ProductDetailsComponent,
    OrderInformationComponent,
    ViewCartComponent,
    CheckOutComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
