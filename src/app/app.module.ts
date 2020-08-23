import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
 // import { MaterialModule } from './material/material.module';
// import { FooterComponent } from './layout-components/footer/footer.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NavbarWithCartComponent } from './layout-components/navbar-with-cart/navbar-with-cart.component';
// import { LandingPageComponent } from './landing-page/landing-page.component'; 
// import { ProductDetailsComponent } from './product-details/product-details.component';
// import { ProductService } from './services/products.service';
// import { OrderInformationComponent } from './order-information/order-information.component';
// import { ViewCartComponent } from './view-cart/view-cart.component';
// import { CheckOutComponent } from './forms/check-out/check-out.component';
// import { SignInComponent } from './forms/sign-in/sign-in.component';
// import { NavbarCartComponent } from './layout-components/navbar-cart/navbar-cart.component';
// import { HttpClientModule } from '@angular/common/http';
// import { AllProductsComponent } from './all-products/all-products.component';
// import { CategoryService } from './services/category.service';


@NgModule({
  declarations: [
    AppComponent, 
     // FooterComponent,
    // NavbarWithCartComponent,
    // LandingPageComponent, 
    // ProductDetailsComponent,
    // OrderInformationComponent,
    // ViewCartComponent,
    // CheckOutComponent,
    // SignInComponent,
    // NavbarCartComponent,
    // AllProductsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    // MaterialModule,
    // BrowserAnimationsModule,
    // HttpClientModule
  ],
  providers: [
    // ProductService,
    // CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
